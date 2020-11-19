import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <div className='home-page'>
        <div className='menu'>
          <Grid container justify='center'>
            <ButtonGroup variant='text' aria-label='text primary button group'>
              <Button component={Link} to={"/closet-page"}>
                My Closet
              </Button>
              <Button>Assemble</Button>
              <Button>My Favorites</Button>
            </ButtonGroup>
          </Grid>
        </div>
      </div>
    );
  }
}

export default HomePage;
