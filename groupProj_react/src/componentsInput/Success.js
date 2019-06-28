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
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Success" />
          <h4>Accessor registration has been completed </h4>
          <p></p>
          <RaisedButton
            label="back to beginning"
            primary={false}
            style={styles.button}
            onClick={this.props.backToMain}
          />

  <RaisedButton
            label="go to assignments"
            primary={true}
            style={styles.button}
            onClick={this.props.isClicked}
          />
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
