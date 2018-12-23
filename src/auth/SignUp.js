import React, { Component } from "react";
import { navigate } from "@reach/router";
import Email from "./Email";
import Password from "./Password";
import { withAuthService } from "./AuthContext";

class SignUpBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      isFormValid: false,
      error: null
    };
  }

  onSubmit = async event => {
    const { email, password } = this.state;

    event.preventDefault();

    try {
      await this.props.authService.createUserWithEmailAndPassword(
        email,
        password
      );
      navigate("/projects");
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
    const { email, password, passwordConfirm, error, isFormValid } = this.state;

    const isInvalid =
      !isFormValid ||
      !email ||
      !password ||
      !passwordConfirm ||
      error ||
      password !== passwordConfirm;

    return (
      <div>
        <h1>Sign Up</h1>
        {error && <p>{error.message}</p>}
        <form onSubmit={this.onSubmit}>
          <Email onChange={this.onChange} email={email} />
          <Password onChange={this.onChange} password={password} />
          <Password
            onChange={this.onChange}
            password={passwordConfirm}
            name="passwordConfirm"
          />

          <button type="submit" disabled={isInvalid ? "disable" : ""}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

const SignUp = withAuthService(SignUpBase);

export default SignUp;
