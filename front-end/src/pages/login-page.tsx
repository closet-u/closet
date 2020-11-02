import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LoginForm from '../components/LoginForm/login'
import RegisterForm from '../components/RegisterForm/register'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  

class LoginPage extends React.Component{
    render(){
        return(
          <div className="ClosetU-App" id="forms">
                            
            <div className="login">
            <h2 id="test1">Login </h2>
            <LoginForm />
            </div>

            {/* <Button variant="contained" component={Link} to={'/home-page'}>Test Routing</Button> */}
         </div>
        )
    }
}

export default LoginPage;