import React from 'react';
import Button from '@material-ui/core/Button';
import './closet-page.css'

interface ClosetPageState {
	files: any;
}

class ClosetPage extends React.Component<{}, ClosetPageState> {

	constructor(props: any) {
		super(props)
		this.state = {
			files: []
		}
		this.handleUpload = this.handleUpload.bind(this)
	}

	handleUpload(event: any) {
		if (event.target.files.length > 0) {
			let oldImages = this.state.files;
			this.setState({
				files: Array.from(event.target.files).map((file: any) => URL.createObjectURL(file)).concat(oldImages)
			});
		}
	}

	showImages() {
		if (this.state.files.length === 0)
			return <span>Upload some images to see them here!</span>
		let images = this.state.files.map((file: any) => <img className={"uploadedImage"} src={file} alt={''}/>)
		return (
			<div className={"uploadedImageContainer"}>
				{images}
			</div>
		)
	}

	render() {
		return (
			<div className={'root'}>
				<input
					accept="image/*"
					className={"input"}
					id="contained-button-file"
					multiple
					type="file"
					onChange={this.handleUpload}
				/>
				<label htmlFor="contained-button-file">
					<Button className={"uploadButton"} variant="contained" color="default" component="span">
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
