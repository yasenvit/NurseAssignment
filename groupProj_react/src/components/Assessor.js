import React, { Component } from 'react'
import "../App.css"
import { UserForm } from '../componentsInput/UserForm'
import Assignment from './Assignment'

// {/*<Assignment newManager = {this.state.newManager}/>*/ }

export default class Assessor extends Component {
 
    render() {
 
        return (
            <div className="App">
                <UserForm updateAssessor={this.props.updateAssessor}/>
            </div>
        )
    }
}

