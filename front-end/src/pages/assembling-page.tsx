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
      <Draggable key={file.filename}>
        <img
          className={"draggableImage"}
          src={`https://test-account-images.s3.us-east-2.amazonaws.com/${file.filename}`}
          alt={file.filename}
          title={file.color + "-" + file.type}
          id={file.filename}
        />
      </Draggable>
    ));
    return <div className='images'>{images}</div>;
  }

  resetImages() {
    this.setState({
      imagesBeingShown: this.state.images,
    });
    this.showImages();
  }

  filterImages(type: string, color: string) {
    let images: ImageMetadata[] = [];
    if (this.state.imagesBeingShown.length === 0)
      return window.alert("No images to select from");
    //this.setState({ ...initialState });
    let assembleRect = document
      .getElementById("assemble")
      ?.getBoundingClientRect();
    console.log(assembleRect);
    this.state.images.forEach((image) => {
      if (color === "Any" && image.type === type) {
        images.push(image);
      } else if (type === "Any" && image.color === color) {
        images.push(image);
      } else if (image.color === color && image.type === type) {
        images.push(image);
      } else {
        let imageElementRect = document
          .getElementById(image.filename)
          ?.getBoundingClientRect();
        if (
          assembleRect &&
          imageElementRect &&
          assembleRect.left < imageElementRect.left
        )
          images.push(image);
      }
    });
    this.setState({ imagesBeingShown: images });
    this.showImages();
  }


  renderSamplePhoto(event: any){
    if(event?.target.files.length> 0){
      return   <img
      className="inspo_photo"
      src={event.target.files.length[0]}
      title = "inps0_image"
      >
      </img>
  }
}


  render() {
    return (
      <div>
        <div className='button-container'>
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
        </div>
        <input
        accept="image/*"
        className={"input"}
        id="samplePhoto"
        multiple
        type="file"
        />
        <label htmlFor = "samplePhoto">
          <Button variant="contained"
          color="primary"
          component = "span">
          Upload sample Photo
          </Button>
        </label>

        <div className='assembling-page'>
          <div className='imageContainerToAssemble'>
            {this.state.loading ? (
              <CircularProgress className='spinner' />
            ) : (
              this.showImages()
            )}
          </div>
          <div className='inspirationPhotoContainer'>I am the image</div>
          <div className='assemble' id='assemble'>
            <div id='message_to_assemble'>Assemble images here!</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AssemblingPage;
