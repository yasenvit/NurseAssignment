import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Logout from '../util/Logout'
import Nav from './Nav'
import Assignment from './Assignment'
import Assessor from './Assessor'
import {Redirect} from 'react-router-dom'

export default class Home extends Component {
    state = {
        members: [],
        newAssessor: null
    }

    updateAssessor = (assessor) => {
        this.setState({newAssessor: assessor})
    }

    render() {
        console.log("home=========", this.state.newAssessor)

        let appLogout= [<Logout clicked={this.props.clicked}/>]
        let routeList = [
        <Route exact path="/assessor"  render={(props)=><Assessor newAssessor={this.state.newAssessor} updateAssessor={this.updateAssessor} {...props} />}/>,
        <Route exact path="/assignment"  render={(props)=> <Assignment newAssessor={this.state.newAssessor} {...props} />} />,
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
