import React from "react";
import ClosetApiService from "../services/ClosetApiService";
import UploadButton from "../components/UploadButton/UploadButton";
import "./closet-page.css";
import { Types } from "../models/ClothingTypes";
import { Colors } from "../models/ClothingColors";
import { CircularProgress } from "@material-ui/core";
import { ImageMetadata } from "../models/ImageMetadata";

interface ClosetPageState {
  images: any[];
  currentImage: any;
  loading: boolean;
}

class ClosetPage extends React.Component<{}, ClosetPageState> {
  closetApiService = new ClosetApiService();
  fileUrl = require("file-url");
  constructor(props: any) {
    super(props);
    this.state = {
      images: [],
      currentImage: {} as File,
      loading: true,
    };
    this.setImages();
    this.handleUpload = this.handleUpload.bind(this);
    this.saveImage = this.saveImage.bind(this);
  }

  saveImage(type: Types, color: Colors) {
    console.log("Calling backend");
    console.log(this.state.currentImage);
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
        console.log({ data });
        if (data) {
          let images: string[] = [];
          data.forEach((imageObject) => {
            console.log({ imageObject });
            images.push(
              `https://test-account-images.s3.us-east-2.amazonaws.com/${imageObject.filename}`
            );
          });
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
      <img className={"uploadedImage"} src={file} alt={file} />
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

  /* sortImages(event: any) {
    this.closetApiService
      .getImagesWithSelectedTags(type, color)
      .then((data: any) => {
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
  } */

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
        <label htmlFor='contained-button-file'>
          <UploadButton saveImageFunction={this.saveImage} />
        </label>
        {this.state.loading ? <CircularProgress /> : this.showImages()}
        {/*  <input accept="image/*" className={"input"} id="icon-button-file" type="file" /> */}
      </div>
    );
  }
}

export default ClosetPage;
