import React from "react";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Draggable from "react-draggable";
import ClosetApiService from "../services/ClosetApiService";
import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SortButton from "../components/UploadButton/SortButton";
import { ImageMetadata } from "../models/ImageMetadata";
import "./assembling-page.css";

interface AssemblingPageState {
  images: ImageMetadata[];
  imagesBeingShown: ImageMetadata[];
  currentImage: any;
  loading: boolean;
}

class AssemblingPage extends React.Component<{}, AssemblingPageState> {
  closetApiService = new ClosetApiService();
  fileUrl = require("file-url");
  constructor(props: any) {
    super(props);
    this.state = {
      images: [],
      imagesBeingShown: [],
      currentImage: {} as File,
      loading: true,
    };
    this.setImages();
    this.showImages();

    this.filterImages = this.filterImages.bind(this);
    this.resetImages = this.resetImages.bind(this);
  }

  setImages() {
    this.closetApiService
      .getUserImages("User 1")
      .then((data: ImageMetadata[]) => {
        if (data) {
          let images: ImageMetadata[] = [];
          data.forEach((imageObject) => {
            images.push(
              //`https://test-account-images.s3.us-east-2.amazonaws.com/${imageObject.filename}`
              imageObject
            );
          });
          this.setState({
            images: images,
            imagesBeingShown: images,
            loading: false,
          });
        }
      });
  }

  showImages() {
    if (this.state.imagesBeingShown.length === 0)
      return <span>Upload some images to see them here!</span>;
    let images = this.state.imagesBeingShown.map((file: ImageMetadata) => (
      <Draggable>
        <img
          className={"uploadedImage_toAssemble"}
          src={`https://test-account-images.s3.us-east-2.amazonaws.com/${file.filename}`}
          alt={file.filename}
          title={file.color + "-" + file.type}
        />
      </Draggable>
    ));
    return <div className={"imageContainer_assemble"}>{images}</div>;
  }

  resetImages() {
    let original_images = this.state.images;
    this.setState({
      imagesBeingShown: original_images,
    });
    this.showImages();
  }

  filterImages(type: string, color: string) {
    let images: ImageMetadata[] = [];
    if (this.state.imagesBeingShown.length === 0)
      return window.alert("No images to select from");
    //this.setState({ ...initialState });
    this.state.imagesBeingShown.forEach((image) => {
      if (image.color === color && image.type === type) {
        images.push(image);
        console.log(images);
      }
    });
    this.setState({ imagesBeingShown: images });
    this.showImages();
  }

  render() {
    let images = this.state.images;
    return (
      <div className='assembling-page'>
        {this.state.loading ? <CircularProgress /> : this.showImages()}
        <label id='filter_button'>
          <SortButton sortImageFunction={this.filterImages} />
        </label>
        <Button
          id='reset_button2'
          size='small'
          onClick={this.resetImages}
          variant='contained'
        >
          Reset Images
        </Button>
        <div className={"assemble"}>
          <div id='message_to_assemble'>Assemble images here!</div>
        </div>
      </div>
    );
  }
}

export default AssemblingPage;
