import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Typography from '@material-ui/core/Typography';

export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    let showButtons = (<div></div>)
    if(values.firstName.length <2 || values.lastName.length <2 || values.zipcodes.length <5){
      showButtons = (
        <RaisedButton
        label="Continue"
        primary={true}
        style={styles.button}
        onClick={this.continue}
        disabled={true}
      />       
      )
    } else {
      showButtons = (
        <RaisedButton
        label="Continue"
        primary={true}
        style={styles.button}
        onClick={this.continue}
        disabled={false}
      />
      )      
    }
  
    return (
      <MuiThemeProvider>
        <React.Fragment>
        <br />
        <Typography component="h1" variant="h6">
          ASSESSOR REGISTRATION FORM
        </Typography>
        <TextField
            hintText="Enter First Name"
            floatingLabelText="First Name"
            onChange={handleChange('firstName')}
            defaultValue={values.firstName}
          />
          <br />
          <TextField
            hintText="Enter Last Name"
            floatingLabelText="Last Name"
            onChange={handleChange('lastName')}
            defaultValue={values.lastName}
          />
          <br />
          <TextField
            hintText="Zipcodes, comma separated"
            floatingLabelText="Enter Prefered Zipcodes"
            onChange={handleChange('zipcodes')}
            defaultValue={values.zipcodes}
          />
          <br />
          <TextField
            hintText="Maximum cases (up to 150)"
            floatingLabelText="Enter maximum cases"
            onChange={handleChange('maxCasesLoad')}
            defaultValue={values.maxCasesLoad}
          />
          <br />
          {showButtons}
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

export default FormUserDetails;
