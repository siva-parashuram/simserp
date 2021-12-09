import React, { Fragment } from "react";
import "../user/dasboard.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class dialogcomponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  render() {
    return (
      <Fragment>
        <Dialog
         className="dialog-prompt-activity"
          open={this.props.open}
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className="dialog-area">
          {this.props.MessageHeader}
          </DialogTitle>
          <DialogContent className="dialog-area">
            <DialogContentText id="alert-dialog-description">
              {this.props.MessageText}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-area">
            <Button onClick={this.props.onClose}>No</Button>
            <Button onClick={this.props.onOK} >
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
export default dialogcomponent;
