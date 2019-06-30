import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

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
        <h5>registration error</h5>
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
          <AppBar title="Success" />
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
