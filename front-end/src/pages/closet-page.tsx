import React from "react";
import ClosetApiService from "../services/ClosetApiService";
import UploadButton from "../components/UploadButton/UploadButton";
import "./closet-page.css";

interface ClosetPageState {
  images: any[];
  currentImage: any;
}

class ClosetPage extends React.Component<{}, ClosetPageState> {
  closetApiService = new ClosetApiService();
  fileUrl = require("file-url");
  constructor(props: any) {
    super(props);
    this.state = {
      images: [],
      currentImage: {} as File,
    };
    this.setImages();
    this.handleUpload = this.handleUpload.bind(this);
  }

  setImages() {
    // TODO get imgs from manny's backend
    this.closetApiService.getUserImages("FIXME").then((data: string[]) =>
      this.setState({
        images: data,
      })
    );
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

  render() {
    let images = this.state.images;
    console.log({ images });
    console.log(images[1]);
    return (
      <div className={"root"}>
        <input
          accept='image/*'
          className={"input"}
          id='contained-button-file'
          type='file'
          onChange={this.handleUpload}
        >
          <UploadButton imageUpload={this.state.currentImage} />
        </input>
        <label htmlFor='contained-button-file'></label>
        {this.showImages()}
        {/*  <input accept="image/*" className={"input"} id="icon-button-file" type="file" /> */}
      </div>
    );
  }
}

export default ClosetPage;
