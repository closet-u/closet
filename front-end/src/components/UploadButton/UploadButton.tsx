//import React from "react";
import React, { createRef, Component } from "react";
import Modal from "react-modal";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Colors } from "../../models/ClothingColors";
import { Types } from "../../models/ClothingTypes";
import "./UploadButton.css";

interface UploadButtonProps {
  saveImageFunction: any;
}

interface UploadButtonState {
  showModal: boolean;
  color: string;
  type: string;
}

class UploadButton extends React.Component<
  UploadButtonProps,
  UploadButtonState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      type: Types.OTHER,
      color: Colors.OTHER,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleColorChange(event: any) {
    this.setState({
      color: event.target.value,
    });
  }

  handleTypeChange(event: any) {
    this.setState({
      type: event.target.value,
    });
  }

  getColorItems() {
    let items: JSX.Element[] = [];
    Object.values(Colors).forEach((color: Colors) =>
      items.push(<MenuItem value={color}>{color}</MenuItem>)
    );
    return items;
  }

  getTypeItems() {
    let items: JSX.Element[] = [];
    Object.values(Types).forEach((type: Types) =>
      items.push(<MenuItem value={type}>{type}</MenuItem>)
    );
    return items;
  }

  handleUploadImage() {
    this.props.saveImageFunction(this.state.type, this.state.color);
    this.handleCloseModal();
  }

  render() {
    return (
      <div>
        <Button
          className={"uploadButton"}
          variant='contained'
          color='default'
          component='span'
          onClick={this.handleOpenModal}
        >
          Upload
        </Button>
        <Dialog
          open={this.state.showModal}
          onClose={this.handleCloseModal}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle>Edit image tags</DialogTitle>
          <DialogContent>
            <FormControl className='upload-form-color'>
              <InputLabel className='select-label'>Color</InputLabel>
              <Select
                className='selector'
                value={this.state.color}
                onChange={this.handleColorChange}
              >
                {this.getColorItems()}
              </Select>
            </FormControl>
            <FormControl className='upload-form-type'>
              <InputLabel className='select-label'>Type</InputLabel>
              <Select
                className='selector'
                value={this.state.type}
                onChange={this.handleTypeChange}
              >
                {this.getTypeItems()}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleUploadImage} color='primary'>
              Close and save
            </Button>
            <Button onClick={this.handleCloseModal} color='secondary'>
              Close without saving
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UploadButton;
