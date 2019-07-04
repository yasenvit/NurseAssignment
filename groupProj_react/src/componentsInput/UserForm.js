import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import Confirm from './Confirm';
import Success from './Success';

export class UserForm extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    zipcodes: '',
    maxCasesLoad: '',
    blobStatus: 0
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };
  backToMain = () =>{
    this.setState({
      step:1,
      firstName: '',
      lastName: '',
      zipcodes: '',
      maxCasesLoad: ''
    })
  }
  isClicked = () => {
    this.props.updateAssessor(this.state)
  }
  getStatus = (blobStatus) => {
    this.setState({
      blobStatus: blobStatus.status
    })
  }
  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { firstName, lastName, zipcodes, maxCasesLoad } = this.state;
    const values = { firstName, lastName, zipcodes, maxCasesLoad };
    console.log(values)
    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            getStatus={this.getStatus}
          />
        );
      case 3:
        return <Success 
        backToMain = {this.backToMain}
        isClicked = {this.isClicked}
        blobStatus = {this.state.blobStatus}
        />;
    }
  }
}

export default UserForm;
