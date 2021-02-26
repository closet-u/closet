import React from "react";
import ClosetApiService from "../services/ClosetApiService";
import UploadButton from "../components/UploadButton/UploadButton";
import SortButton from "../components/UploadButton/SortButton";
import "./closet-page.css";
import { Types } from "../models/ClothingTypes";
import { Colors } from "../models/ClothingColors";
import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { ImageMetadata } from "../models/ImageMetadata";

interface ClosetPageState {
  images: ImageMetadata[];
  imagesBeingShown: ImageMetadata[];
  currentImage: any;
  loading: boolean;
}

const initialState = {
  images: [],
};

class ClosetPage extends React.Component<{}, ClosetPageState> {
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
    this.handleUpload = this.handleUpload.bind(this);
    this.saveImage = this.saveImage.bind(this);
    this.filterImages = this.filterImages.bind(this);
    this.resetImages = this.resetImages.bind(this);
  }

  saveImage(type: Types, color: Colors) {
    this.closetApiService.sendImages(this.state.currentImage, type, color);
    //PLS DONT DO THIS FIX THIS THIS IS BAD
    //Make a loading sign and completion sign
    this.sleep(4000);
    this.setImages();
  }

  sleep(milliseconds: any) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
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
      <img
        className={"uploadedImage"}
        src={`https://test-account-images.s3.us-east-2.amazonaws.com/${file.filename}`}
        alt={file.filename}
        title={file.color + "-" + file.type}
      />
    ));
    return <div className={"uploadedImageContainer"}>{images}</div>;
  }

  handleUpload(event: any) {
    if (event.target.files.length > 0) {
      this.setState({
        currentImage: event.target.files[0],
      });
    }
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
    console.log({ images });
    return (
      <div className={"root"}>
        <input
          accept='image/*'
          className={"input"}
          id='contained-button-file'
          type='file'
          onChange={this.handleUpload}
        />
        <div className='button-container'></div>
        <label id='upload' htmlFor='contained-button-file'>
          <UploadButton saveImageFunction={this.saveImage} />
        </label>
        <label id='filter_button'>
          <SortButton sortImageFunction={this.filterImages} />
        </label>
        <Button
          id='reset_button'
          size='small'
          onClick={this.resetImages}
          variant='contained'
        >
          Reset Images
        </Button>

        {this.state.loading ? <CircularProgress /> : this.showImages()}
      </div>
    );
  }
}

export default ClosetPage;
