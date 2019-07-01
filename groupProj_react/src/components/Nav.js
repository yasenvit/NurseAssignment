import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import Logout from '../util/Logout'
import Assignment from './Assignment'
import Assessor from './Assessor'
import Home from './Home'
import '../App.css';

export default class Nav extends Component {
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
      <Route exact path="/" component={Home} />,
      <Route exact path="/assessor"  render={(props)=><Assessor newAssessor={this.state.newAssessor} updateAssessor={this.updateAssessor} {...props} />}/>,
      <Route exact path="/assignment"  render={(props)=> <Assignment newAssessor={this.state.newAssessor} {...props} />} />,
    ]
    return (
      <div className="home-container">
        <div className="home-header">
          <div>
            <ul>
              <li><Link onClick={this.componentWillUnmount} to="/">HOME</Link></li>
              <li><Link onClick={this.componentWillUnmount} to="/assessor">CARE MANAGER PROFILE</Link></li>
              <li><Link onClick={this.componentWillUnmount} to="/assignment">CARE MANAGER ASSIGNMENT</Link></li>
            </ul> 
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
