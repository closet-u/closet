import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
  const defaultProps = {
    bgcolor: 'background.paper',
    width:9999,
    borderColor: 'text.primary',
  };
  

class HomePage extends React.Component {
    render(){
        return(
            <div className="home-page">
                
                    <div className="menu">
                    <Grid container justify="center">
                        <ButtonGroup variant="text"  aria-label="text primary button group">
                            <Button component={Link} to={'/closet-page'}>My Closet</Button>
                            <Button>Assemble</Button>
                            <Button>My Favorites</Button>
                        </ButtonGroup>
                    </Grid>
                    </div>
                
            </div>
        )
    }
}

export default HomePage;