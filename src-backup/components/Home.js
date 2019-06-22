import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Logout from '../util/Logout'
import Nav from './Nav'
import Assignment from './Assignment'

export default class Home extends Component {
    state = {
        members: []
    }

    render() {
        let appLogout= [<Logout clicked={this.props.clicked}/>]
        let routeList = [
            
            <Route exact path="/assignment" component={Assignment}/>,
            ]
        return (
            <div className="home-container">
                <div className="home-header">
                    <div></div>
                    <div>Nurse Asignment Tool</div>
                    <div>
                    {appLogout}
                </div>
                </div>
                <div className="nav">
                    <Nav/>
                </div>
                
                <div className="home-output">
                
                    {routeList}
                        
                </div>
            
          </div>
        )
    }
}
