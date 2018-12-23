import React, { Component } from "react";
import { Link, Router, navigate } from "@reach/router";
import "./App.css";
import Projects from "./projects/Projects";
import Inventory from "./inventory/Inventory";
import CartBuilder from "./cart-builder/CartBuilder.js";
import {
  SignIn,
  SignUp,
  SignOut,
  AuthService,
  AuthContext,
  UserContext
} from "./auth";

class App extends Component {
  componentWillMount() {
    this.setState({
      projects: [],
      authUser: null
    });

    this.authService = new AuthService();
    this.authService.auth.onAuthStateChanged(user => {
      if (!!user) {
        this.setState(
          {
            authUser: user
          },
          this.navigateHome
        );
      } else {
        this.setState({ authUser: null }, this.navigateSignIn);
      }
    });
  }

  componentWillUnmount() {
    this.authStateListener();
  }

  navigateHome() {
    navigate("/");
  }

  navigateSignIn() {
    navigate("/sign-in");
  }

  onNewProject = project => {
    this.setState({
      ...this.state,
      projects: [
        ...this.state.projects,
        {
          ...project,
          id:
            this.state.projects.length === 0
              ? 0
              : Math.max(...this.state.projects.map(project => project.id)) + 1
        }
      ]
    });
  };

  render() {
    return (
      <AuthContext.Provider value={this.authService}>
        <UserContext.Provider value={this.currentUser}>
          <div className="App">
            <nav>
              <Link to="projects">Projects</Link>
              <Link to="inventory">Inventory</Link>
              <Link to="cart-builder">Cart Builder</Link>
              <SignOut />
            </nav>
            <Router>
              <Projects
                path="projects/*"
                projects={this.state.projects}
                onNewProject={this.onNewProject}
                default
              />
              <Inventory path="inventory/*" />
              <CartBuilder path="cart-builder/*" />
              <SignIn path="sign-in" />
              <SignUp path="sign-up" />
            </Router>
          </div>
        </UserContext.Provider>
      </AuthContext.Provider>
    );
  }
}

export default App;
