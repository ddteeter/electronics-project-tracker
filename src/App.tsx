import { Link, navigate, Router } from "@reach/router";
import { Unsubscribe } from "firebase";
import React, { Component } from "react";
import "./App.css";
import { AuthContext, AuthService, SignIn, SignOut, UserContext } from "./auth";
import CartBuilder from "./cart-builder/CartBuilder";
import Inventory from "./inventory/Inventory";
import Project from "./projects/model/Project";
import Projects from "./projects/Projects";

type State = {
  readonly projects: Project[];
  readonly authUser?: firebase.User;
};

class App extends Component<{}, State> {
  private authService: AuthService;
  private authStateUnsubscribe?: Unsubscribe = undefined;

  constructor(props: {}) {
    super(props);

    this.state = {
      projects: [],
      authUser: undefined
    };

    this.authService = new AuthService();
    // TODO: Add loading indicator until initial onAuthStateChanged is fired for inital user
    // state or a time period has elapsed (to prevent sign in flash).
    this.authService.auth.onAuthStateChanged(user => {
      if (!!user) {
        this.setState(
          {
            authUser: user
          },
          this.navigateHome
        );
      } else {
        this.setState({ authUser: undefined }, this.navigateToSignIn);
      }
    });
  }

  componentWillUnmount() {
    if (this.authStateUnsubscribe) {
      this.authStateUnsubscribe();
    }
  }

  navigateHome() {
    navigate("/projects");
  }

  navigateToSignIn() {
    navigate("/sign-in");
  }

  onNewProject = (project: Project) => {
    this.setState({
      ...this.state,
      projects: [...this.state.projects, project]
    });
  };

  render() {
    return (
      <AuthContext.Provider value={this.authService}>
        <UserContext.Provider value={this.state.authUser}>
          <div className="App">
            {!!this.state.authUser ? (
              <nav>
                <Link to="projects">Projects</Link>
                <Link to="inventory">Inventory</Link>
                <Link to="cart-builder">Cart Builder</Link>
                <SignOut />
              </nav>
            ) : null}
            <Router>
              <Projects
                path="projects/*"
                projects={this.state.projects}
                onNewProject={this.onNewProject}
              />
              <Inventory path="inventory/*" />
              <CartBuilder path="cart-builder/*" />
              <SignIn path="sign-in" />
            </Router>
          </div>
        </UserContext.Provider>
      </AuthContext.Provider>
    );
  }
}

export default App;
