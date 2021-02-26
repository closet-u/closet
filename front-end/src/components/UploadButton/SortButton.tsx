import React, { createRef, Component } from "react";

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
import "./SortButton.css";

interface SortButtonProps {
  sortImageFunction: (type: string, color: string) => void;
}

interface SortButtonState {
  showModal: boolean;
  color: string;
  type: string;
}

class SortButton extends React.Component<SortButtonProps, SortButtonState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      type: "Any",
      color: "Any",
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSortImage = this.handleSortImage.bind(this);
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
    items.push(<MenuItem value={"Any"}>{"Any"}</MenuItem>);
    return items;
  }

  getTypeItems() {
    let items: JSX.Element[] = [];
    Object.values(Types).forEach((type: Types) =>
      items.push(<MenuItem value={type}>{type}</MenuItem>)
    );
    items.push(<MenuItem value={"Any"}>{"Any"}</MenuItem>);
    return items;
  }

  handleSortImage() {
    this.props.sortImageFunction(this.state.type, this.state.color);
    this.handleCloseModal();
  }

  render() {
    return (
      <div>
        <Button
          className={"SortButton"}
          variant='contained'
          size='small'
          color='default'
          component='span'
          onClick={this.handleOpenModal}
        >
          Sort Clothing Item
        </Button>
        <Dialog
          open={this.state.showModal}
          onClose={this.handleCloseModal}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle>Edit image tags</DialogTitle>
          <DialogContent>
            <FormControl className='sort-form-color'>
              <InputLabel className='select-label'>Color</InputLabel>
              <Select
                className='selector'
                value={this.state.color}
                onChange={this.handleColorChange}
              >
                {this.getColorItems()}
              </Select>
            </FormControl>
            <FormControl className='sort-form-type'>
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
            <Button onClick={this.handleSortImage} color='primary'>
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

export default SortButton;
