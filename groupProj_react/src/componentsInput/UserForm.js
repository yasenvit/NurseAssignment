import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import Confirm from './Confirm';
import Success from './Success';
import { object } from 'prop-types';

export class UserForm extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    zipcodes: '',
    maxCasesLoad: ''
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
    this.props.gotoAssignment(this.state)
  }

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { firstName, lastName, zipcodes, maxCasesLoad } = this.state;
    const values = { firstName, lastName, zipcodes, maxCasesLoad };

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
          />
        );
      case 3:
        return <Success 
        backToMain = {this.backToMain}
        updateAssessor={this.props.updateAssessor}
        />;
    }
  }
}

export default UserForm;
