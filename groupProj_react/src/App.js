import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom'
import isloggedin from './util/isloggedin';
import Login from './util/Login';
import logoutf from './util/logoutf';
import SignUp from './util/SignUp';
import apiCall from './util/apiCall';
import Home from './components/Home';
import './App.css'

class App extends Component {
  state={
    members:null
  }
  currentTime() {
    this.setState ({
      time:new Date()
    })
  }

  signup = (username, password) => {
    const promise = apiCall('/api/signup', 'post', {
      "username": username,
      "password": password
    })
    promise.then(blob=>blob.json()).then(json=>{
      if (json.api_key !== undefined) {
        window.sessionStorage.setItem("apikey", json.api_key)
        window.sessionStorage.setItem("username", json.username)
        this.setState({
          refresh: "loggedin",
          error: ""
        })
      }
      else {
        this.setState({
          refresh: "login error",
          error: "Could not sign up"
        })
        alert("This username is already taken")  
      }
    })
  }

  loginf = (username, password) => {
    console.log("login func credencials input:", username, password)
    const promise = apiCall('/api/get_api_key', 'post', {
      "username": username,
      "password": password
    })
    promise.then(blob=>blob.json()).then(json=>{
       if (json.api_key !== undefined) {
        window.sessionStorage.setItem("apikey", json.api_key)
        window.sessionStorage.setItem("username", json.username)
        this.setState({
          refresh: "loggedin",
          username: json.username
        })
      }
      else {
        this.setState({
          refresh: "login error",
          error: "Could not log in"
        })   
      }
    })
  }

  logoutClick=(event)=>{
    event.preventDefault()
    logoutf()
    this.setState({refresh: "loggedout"})
  }
  render () {

    let appLogin = []
    let routeList = []
    let appSignUp = []
    let output = []
    
    if (isloggedin()){
      output = (
        <div>
          <Home clicked={this.logoutClick}/>
        </div>
      )
    } else {
      appLogin=[<Link to="/login" style={{color:"brown", textDecoration: "none"}}>Sing in</Link>]
      appSignUp=[<Link to="/signup" style={{color:"brown", textDecoration: "none"}} >Sign up</Link>]
      routeList=[
        <Route exact path="/signup" render={(props)=><SignUp {...props} signupfunc={this.signup} />}/>,
        <Route path="/login" render={(props)=><Login {...props} loginfunc={this.loginf} />} />  
      ]
      output= [
        <div className="body-box">
          <div className="header">
            <div className="logs-block"></div>
            <div className="header-center">Welcome to Nurse Assignment Tool</div>
            <div className="logs-block">
              <div>
              {appSignUp}
              </div>
              <div>
                {appLogin}
              </div>
            </div>
          </div>
        <div className="output-container">
          {routeList}
        </div>
      </div>
      ]
    }
    return (
      <BrowserRouter>
        <div>
          {output}
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
