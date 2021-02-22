import React from "react";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Draggable from "react-draggable";
import ClosetApiService from "../services/ClosetApiService";
import { CircularProgress } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import "./assembling-page.css";

interface AssemblingPageState {
  images: any[];
  loading: boolean;
}

class AssemblingPage extends React.Component<{}, AssemblingPageState> {
  closetApiService = new ClosetApiService();
  fileUrl = require("file-url");
  constructor(props: any) {
    super(props);
    this.state = {
      images: [],
      loading: true,
    };
    this.setImages();
  }

  setImages() {
    this.closetApiService.getUserImages("User 1").then((data: any) => {
      console.log({ data });
      if (data) {
        let images = [];
        for (let image in data) {
          images.push(
            `https://test-account-images.s3.us-east-2.amazonaws.com/${image}`
          );
        }
        console.log({ images });
        this.setState({
          images: images,
          loading: false,
        });
      }
    });
  }

  showImages() {
    console.log(this.state.images);
    if (this.state.images.length === 0)
      return <span>Upload some images to see them here!</span>;
    let images = this.state.images.map((file: any) => (
      <Draggable>
        <img className={"uploadedImage_toAssemble"} src={file} alt={file} />
      </Draggable>
    ));
    return <div className={"imageContainer"}>{images}</div>;
  }

  render() {
    let images = this.state.images;
    return (
      <div className='assembling-page'>
        {this.state.loading ? <CircularProgress /> : this.showImages()}

        <div className={"assemble"}>
          <div id='message_to_assemble'>Assemble images here!</div>
        </div>
      </div>
    );
  }
}

export default AssemblingPage;
