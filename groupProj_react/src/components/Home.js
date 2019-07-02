import React, { Component } from 'react'
import {Route, Link, NavLink} from 'react-router-dom'
import Logout from '../util/Logout'
import Assignment from './Assignment'
import Assessor from './Assessor'
import Homecontent from './Homecontent'
import '../App.css';

export default class Home extends Component {
    state = {
        members: [],
        newAssessor: null
      }
  updateAssessor = (assessor) => {
    this.setState({newAssessor: assessor})
  }
  componentWillUnmount =() => {
    this.setState({
      newAssessor: null
    })
      }
  render() {
    let appLogout= [<Logout clicked={this.props.clicked}/>]
    let routeList = [
      <Route exact path="/" component={Homecontent} />,
      <Route exact path="/assessor"  render={(props)=>
        <Assessor
          newAssessor={this.state.newAssessor}
          updateAssessor={this.updateAssessor} {...props} />}
          />,
      <Route exact path="/assignment"  render={(props)=>
        <Assignment newAssessor={this.state.newAssessor} {...props} />}/>,
    ]
  return (
    <div className="nav-container">
      <div className="nav-header">
        <div className="navbox">
          <div className="tagbox">
            <NavLink
              onClick={this.componentWillUnmount}
              exact to="/"
              activeStyle={{color:"whitesmoke",backgroundColor:"#00bcd4"}}
              >home
            </NavLink>
          </div>
          <div className="tagbox">
            <NavLink
              onClick={this.componentWillUnmount}
              exact to="/assessor"
              activeStyle={{color:"whitesmoke",backgroundColor:"#00bcd4"}}
              >care manager profile
            </NavLink>
          </div>
          <div className="tagbox">
            <NavLink 
              onClick={this.componentWillUnmount}
              exact to="/assignment"
              activeStyle={{color:"whitesmoke",backgroundColor:"#00bcd4"}}
              >care manager assignment
            </NavLink>
          </div>
        </div>
      <div style={{marginRight:"20px"}}>
        {appLogout}
      </div>
      </div>
        <div className="nav-output">
          {routeList}
        </div>
      </div>
    )
  }
}
    