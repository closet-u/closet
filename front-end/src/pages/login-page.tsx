import React from "react";
import LoginForm from "../components/LoginForm/login";

class LoginPage extends React.Component {
  render() {
    return (
      <div className='ClosetU-App' id='forms'>
        <div className='login'>
          <h2 id='test1'>Login </h2>
          <LoginForm />
        </div>

        {/* <Button variant="contained" component={Link} to={'/home-page'}>Test Routing</Button> */}
      </div>
    );
  }
}

export default LoginPage;
