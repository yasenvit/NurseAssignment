import React, { Component } from 'react'
import logo from '../images/bigstock-Portrait-of-a-smiling-nurse-in-47689855-1024x676.jpg';
export default class Homecontent extends Component {
    render() {
        return (
            <div>
                <h2>Welcome to the Care Management Assignment Tool</h2>
                <img src={logo} height='800px'></img>
            </div>
        )
    }
}
