import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LoginForm from './components/LoginForm/login'
import RegisterForm from './components/RegisterForm/register'
import "./App.css";

const defaultProps = {
  bgcolor: 'background.paper',

  width:9999,
  borderColor: 'text.primary',
};
function App() {
  return (
    
    <div className="ClosetU-App" id="forms">
    < h1 id ="title">Closet-U</h1>
    <Box borderBottom={2} {...defaultProps} />
    <div className="menu">
    <Grid container justify="center">
      <ButtonGroup variant="text"  aria-label="text primary button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
      </ButtonGroup>
    </Grid>
    </div>
    <Box borderBottom={2} {...defaultProps} />
      <div className="login">
        <h2 id="test1">Login </h2>
        <LoginForm />
        <h2 id="test2">Register </h2>
        <RegisterForm />
        
      </div>
    </div>
  );
}
//<meta name="google-signin-client_id" content="659533622869-ooo1g1endl0pa812dsoama5b0ajuac9e.apps.googleusercontent.com"></meta>
export default App;
 