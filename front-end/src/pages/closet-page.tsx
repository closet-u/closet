import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import './closet-page.css'


class ClosetPage extends React.Component {

    render() {

        return (

            <div className={'root'}>
                <input
                    accept="image/*"
                    className={"input"}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="default" component="span">
                        Upload
                </Button>
                </label>
                {/*  <input accept="image/*" className={"input"} id="icon-button-file" type="file" /> */}

            </div>

        );
    }
}

export default ClosetPage;
