import React, { Component } from "react";
import { Link } from "@reach/router";
import Email from "./Email";
import Password from "./Password";
import { withAuthService } from "./AuthContext";

class SignInBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isFormValid: false,
      error: null
    };
  }

  onSubmit = async event => {
    const { email, password } = this.state;

    event.preventDefault();

    try {
      await this.props.authService.signInWithEmailAndPassword(email, password);
    } catch (e) {
      this.setState({ error: e });
    }
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      isFormValid: event.target.form.checkValidity()
    });
  };

  render() {
    const { email, password, error, isFormValid } = this.state;

    const isInvalid = !isFormValid || !email || !password;

    return (
      <div>
        <h1>Sign In</h1>
        {error && <p>{error.message}</p>}
        <form onSubmit={this.onSubmit}>
          <Email onChange={this.onChange} email={email} />
          <Password onChange={this.onChange} password={password} />

          <button type="submit" disabled={isInvalid}>
            Sign In
          </button>
          <p>
            Not signed up? <Link to="/sign-up">Sign up here</Link>
          </p>
        </form>
      </div>
    );
  }
}

const SignIn = withAuthService(SignInBase);

export default SignIn;
