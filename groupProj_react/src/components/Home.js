import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Logout from '../util/Logout'
import Nav from './Nav'
import Assignment from './Assignment'
import Assessor from './Assessor'

export default class Home extends Component {
    state = {
        members: []
    }

    render() {
        let appLogout= [<Logout clicked={this.props.clicked}/>]
        let routeList = [
            <Route exact path="/assessor" component={Assessor}/>,
            <Route exact path="/assignment" component={Assignment}/>,
            ]
        return (
            <div className="home-container">
             
                <div className="home-header">
                    <div>
                        <Nav/>
                    </div>
                    
                    <div style={{marginRight:"20px"}}>
                    {appLogout}
                </div>
                </div>
                
                <div className="home-output">
                
                    {routeList}
                        
                </div>
            
          </div>
        )
    }
}
