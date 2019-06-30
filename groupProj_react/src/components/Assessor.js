import React, { Component } from 'react'
import "../App.css"
import { UserForm } from '../componentsInput/UserForm'
import { Redirect } from 'react-router-dom'

export default class Assessor extends Component {
 
    render() {
        if (this.props.newAssessor) {
            return <Redirect to="/assignment" />
        }
        return (
            <div className="App">
                <UserForm updateAssessor={this.props.updateAssessor}/>
            </div>
        )
    }
}

