import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import apiCall from '../util/apiCall';
import Typography from '@material-ui/core/Typography';

export class Confirm extends Component {
  getRecord(object) {
    const endpoint = `/api/${window.sessionStorage.getItem('apikey')}/newcaremanager`
    const promise = apiCall(endpoint, 'post', {
      firstname: object.firstName,
      lastname: object.lastName,
      zipcode: object.zipcodes,
      maxcaseload: parseInt(object.maxCasesLoad)>0 && parseInt(object.maxCasesLoad)<151?object.maxCasesLoad:150
    })
    promise.then(blob=>{
      this.props.getStatus({status: blob.status})
    })
  }
  continue = e => {
    e.preventDefault();
    this.getRecord(this.props.values)
    this.props.nextStep()
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { firstName, lastName, zipcodes, maxCasesLoad }
    } = this.props;
    
    return (
      <MuiThemeProvider>
        <React.Fragment>
        <br />
        <br />
        <br />
        <Typography component="h1" variant="h6">
          CONFIRMATION
        </Typography>
          <List>
            <ListItem primaryText="First Name" secondaryText={firstName} />
            <ListItem primaryText="Last Name" secondaryText={lastName} />
            <ListItem primaryText="Prefered Zipcodes" secondaryText={zipcodes} />
            <ListItem primaryText="Maximum cases" secondaryText={parseInt(maxCasesLoad)>0 && parseInt(maxCasesLoad)<151?maxCasesLoad:150} />
          </List>
             
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back}
          />
          <RaisedButton
            label="Confirm & Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
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

export default Confirm;
