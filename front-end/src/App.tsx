import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import "./App.css";
import "./pages/closet-page";
import LoginPage from "./pages/login-page";
import ClosetPage from "./pages/closet-page";
import HomePage from "./pages/home-page";
import AssemblingPage from "./pages/assembling-page";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const defaultProps = {
  bgcolor: "background.paper",
  width: "100%",
  borderColor: "text.primary",
};

function App() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const redirect = () => {
    window.location.href = "http://localhost:3000/assembling-page";
  };
  const redirectCloset = () => {
    window.location.href = "http://localhost:3000/closet-page";
  };
  return (
    <Router>
      {/* REFACTOR: MOVE TO MAIN PAGE*/}
      <div id='wrapper'>
        <h1 id='title'>Closet-U</h1>
        <Box borderBottom={2} {...defaultProps} />
        <div className='menu'>
          <Button
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            Open Menu
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={redirectCloset}>My Closet</MenuItem>
            <MenuItem onClick={redirect}>Assemble</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      <Box borderBottom={2} {...defaultProps} />

      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/closet-page' component={ClosetPage} />
        <Route path='/home-page' component={HomePage} />
        <Route path='/assembling-page' component={AssemblingPage} />
      </Switch>
    </Router>
  );
}
//<meta name="google-signin-client_id" content="659533622869-ooo1g1endl0pa812dsoama5b0ajuac9e.apps.googleusercontent.com"></meta>
export default App;
