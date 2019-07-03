import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Typography from '@material-ui/core/Typography';

export class Success extends Component {

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    let message = (<div></div>)
    let buttons = (<div></div>)
    if(this.props.blobStatus === 200) {
      message = (
        <h4>Accessor registration has been completed</h4>
      )
      buttons = (
        <div>
          <RaisedButton
            label="back to form"
            primary={false}
            style={styles.button}
            onClick={this.props.backToMain}
          />
          <RaisedButton
            label="go to assignments"
            primary={true}
            style={styles.button}
            onClick={this.props.isClicked}
            disabled={false}
          />
        </div>
      )
    } else {
      message = (
        <h5>Registration error, please check form</h5>
      )
      buttons = (
        <div>
          <RaisedButton
            label="back to form"
            primary={false}
            style={styles.button}
            onClick={this.props.backToMain}
          />
          <RaisedButton
            label="go to assignments"
            primary={true}
            style={styles.button}
            onClick={this.props.isClicked}
            disabled={true}
          />
        </div>
      )
    }
   
    return (
      <MuiThemeProvider>
        <React.Fragment>
        <br />
        <Typography component="h1" variant="h6">
          
        </Typography>
          {message}
          <p></p>
          {buttons}
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}
const styles = {
  button: {
    margin: 15
  }
};
export default Success;
