import React from "react";
import Button from "@material-ui/core/Button";
import "./closet-page.css";
import ClosetApiService from "../services/ClosetApiService";
import { pathToFileURL } from "url";

interface ClosetPageState {
  images: any[];
}

class ClosetPage extends React.Component<{}, ClosetPageState> {
  closetApiService = new ClosetApiService();
  fileUrl = require("file-url");
  constructor(props: any) {
    super(props);
    this.state = {
      images: [],
    };
    this.setImages();
    this.handleUpload = this.handleUpload.bind(this);
  }

  setImages() {
    this.closetApiService.getUserImages("FIXME").then((data: string[]) =>
      this.setState({
        images: data,
      })
    );
  }

  handleUpload(event: any) {
    if (event.target.files.length > 0) {
      // TODO send `event.target.files` to the backend
      let uploadedImages = Array.from(event.target.files).map((file: any) =>
        URL.createObjectURL(file)
      );
      this.setState({
        images: this.state.images.concat(uploadedImages),
      });
    }
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

  render() {
    let images = this.state.images;
    console.log({ images });
    return (
      <div className={"root"}>
        <input
          accept='image/*'
          className={"input"}
          id='contained-button-file'
          multiple
          type='file'
          onChange={this.handleUpload}
        />
        <label htmlFor='contained-button-file'>
          <Button
            className={"uploadButton"}
            variant='contained'
            color='default'
            component='span'
          >
            Upload
          </Button>
        </label>
        {this.showImages()}
        {/*  <input accept="image/*" className={"input"} id="icon-button-file" type="file" /> */}
      </div>
    );
  }
}

export default ClosetPage;
