import React from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

import ClosetApiService from "../../services/ClosetApiService";
import "./login.css";

interface LoginFormState {
  username: string;
  password: string;
}

class LoginForm extends React.Component<{}, LoginFormState> {
  closetApiService = new ClosetApiService();

  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  response_login = "";

  handleLogin(event: any): void {
    event.preventDefault();
    alert(
      "A name was submitted: " + this.state.username + " " + this.state.password
    );
    let response = this.closetApiService.get_user_info(
      this.state.username,
      this.state.password
    );
    console.log(response);
  }

  handleRegister(event: any): void {
    event.preventDefault();
    alert(
      "A name was submitted: " + this.state.username + " " + this.state.password
    );
    let response = this.closetApiService.send_register_info(
      this.state.username,
      this.state.password
    );
    console.log(response);
  }
  myFunction() {
    window.location.href = "http://localhost:3000/closet-page";
  }

  render() {
    return (
      <div id='usern_password'>
        <form noValidate autoComplete='off'>
          <InputLabel htmlFor='username'>Username</InputLabel>
          <Input
            onChange={(event: any) => {
              this.setState({ username: event.target.value });
            }}
            id='username'
            aria-describedby='my-helper-text'
          />

          <InputLabel htmlFor='password'>Password</InputLabel>
          <Input
            onChange={(event: any) => {
              this.setState({ password: event.target.value });
            }}
            type='password'
            id='password_log'
            aria-describedby='my-helper-text'
          />
          <div id='login_button'>
            <Button
              variant='outlined'
              onClick={(event: any) => {
                this.handleLogin(event);
              }}
              id='registration_sub'
            >
              Register
            </Button>
            {/* <Button variant='outlined' onClick={(event: any) => {
              this.handleRegister(event)
            }} id="registration_sub">Register</Button> */}
            <Button
              variant='outlined'
              onClick={this.myFunction}
              id='registration_sub'
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
