import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

import './register.css';


interface LoginFormState {
  username: string;
  password: string;
}


class RegisterForm extends React.Component<{}, LoginFormState> {
  
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  

  handleChange(event: any) {
    this.setState({username: event.target.value});
  }

  handleSubmit(event: any) {
    alert('A name was submitted: ' + this.state.username + ' ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <div id = "usern_password_register">
        
        <form noValidate autoComplete="off">
     
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input onChange={(event: any) => {
            this.setState({username: event.target.value});
          }} id="username" aria-describedby="my-helper-text" />

          <InputLabel htmlFor="password">Password</InputLabel>
          <Input onChange={(event: any) => {
            this.setState({password: event.target.value});
          }} type="password" id="password_log" aria-describedby="my-helper-text" />
          <div id="register_button">
          <Button variant = 'outlined' onClick={(event: any) =>{
            this.handleSubmit(event)
        }} id="registration_sub">Click me</Button>
        </div>
       
        </form>
          
      
      </div>
    );
  }
}

export default RegisterForm; 