import React from "react"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import "./App.css"
import "./pages/closet-page"
import LoginPage from "./pages/login-page"
import ClosetPage from "./pages/closet-page"
import HomePage from "./pages/home-page"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const defaultProps = {
  bgcolor: "background.paper",
  width: 9999,
  borderColor: "text.primary",
}

function App() {
  return (
    <Router>
      {/* REFACTOR: MOVE TO MAIN PAGE*/}
      <h1 id='title'>Closet-U</h1>
      <Box borderBottom={2} {...defaultProps} />
      <div className='menu'>
        <Grid container justify='center'></Grid>
      </div>

      <Box borderBottom={2} {...defaultProps} />

      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/closet-page' component={ClosetPage} />
        <Route path='/home-page' component={HomePage} />
      </Switch>
    </Router>
  )
}
//<meta name="google-signin-client_id" content="659533622869-ooo1g1endl0pa812dsoama5b0ajuac9e.apps.googleusercontent.com"></meta>
export default App
