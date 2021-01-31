import React from "react";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Draggable from "react-draggable";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import "./assembling-page.css";

class AssemblingPage extends React.Component {
  render() {
    var images: string[];
    images = ["./blk_TOP.jpg", "./BOOTS.jpg"];
    console.log(images);
    {
      images.map((image: any) => console.log(image));
    }
    return (
      <div className={"allAssemblyComponents"}>
        <div className={"imageContainer"}>
          <Grid
            container
            className={"grid"}
            direction='row'
            alignItems='flex-start'
            spacing={2}
          >
            <Grid item xs>
              <Draggable>
                <img
                  src={require("./DJEANS.jpg")}
                  alt='test'
                  width='150'
                  height='150'
                  id='help'
                ></img>
              </Draggable>
            </Grid>
            <Grid item xs={4}>
              <Draggable>
                <img
                  src={require("./HEELS.jpg")}
                  alt='test'
                  width='150'
                  height='150'
                  id='help'
                ></img>
              </Draggable>
            </Grid>
            <Grid item xs={4}>
              <Draggable>
                <img
                  src={require("./WJEANS.jpg")}
                  alt='test'
                  width='150'
                  height='150'
                  id='help'
                ></img>
              </Draggable>
            </Grid>

            <Grid item xs={4}>
              <Draggable>
                <img
                  src={require("./BOOTS.jpg")}
                  alt='test'
                  width='150'
                  height='150'
                  id='help'
                ></img>
              </Draggable>
            </Grid>
            <Grid item xs={4}>
              <Draggable>
                <img
                  src={require("./blk_TOP.jpg")}
                  alt='test'
                  width='150'
                  height='100'
                  id='help'
                ></img>
              </Draggable>
            </Grid>
            <Grid item xs={4}>
              <Draggable>
                <img
                  src={require("./CARDI.jpg")}
                  alt='test'
                  width='150'
                  height='150'
                  id='help'
                ></img>
              </Draggable>
            </Grid>
          </Grid>
        </div>
        <div className={"assemble"}>Assemble images here!</div>
      </div>
    );
  }
}

export default AssemblingPage;
