import React, { Component } from 'react'
import "../App.css"
import { UserForm } from '../componentsInput/UserForm';

export default class Assessor extends Component {
    render() {
        return (
            <div className="App">
                <UserForm />
            </div>
        )
    }
}

