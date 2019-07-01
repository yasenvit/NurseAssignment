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
      <Route exact path="/home" component={Home} />,
      <Route exact path="/assessor"  render={(props)=><Assessor newAssessor={this.state.newAssessor} updateAssessor={this.updateAssessor} {...props} />}/>,
      <Route exact path="/assignment"  render={(props)=> <Assignment newAssessor={this.state.newAssessor} {...props} />} />,
    ]
    return (
      <div className="nav-container">
        <div className="nav-header">
          <div className="navbox">
            
              <div className="tagbox"><Link onClick={this.componentWillUnmount} to="/home">home</Link></div>
              <div className="tagbox"><Link onClick={this.componentWillUnmount} to="/assessor">care manager profile</Link></div>
              <div className="tagbox"><Link onClick={this.componentWillUnmount} to="/assignment">care manager assignment</Link></div>
            
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
