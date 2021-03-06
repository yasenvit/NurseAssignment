import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import isloggedin from './util/isloggedin';
import SignIn from './util/SignIn';
import logoutf from './util/logoutf';
import SignUp from './util/SignUp';
import apiCall from './util/apiCall';
import Home from './components/Home';
import './App.css'

class App extends Component {
  state={
    userlogin: null,
    userpassword: "",
    userpasswordRetypped: "",
    members:null,
    refresh:""
  }

  signupf = (username, password) => {
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

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  loginf = (username, password) => {
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
    this.setState({
      refresh: "loggedout",
        })
  }
  render () {
    const { userlogin, userpassword, userpasswordRetypped } = this.state;
    const credencials = {userlogin, userpassword, userpasswordRetypped};
    let routeList = []
    let signupLink ="/signup"
    let signinLink ="/login"
    
    if(isloggedin()){
      routeList=[
        <Route exact path="/login" render={()=><Redirect to="/"/>}/>,
        <Route exact path="/signup" render={()=><Redirect to="/"/>}/>,
        <Home clicked={this.logoutClick}/>,
      ]
      } else {
        routeList=[
          <Route exact path="/" render={(props)=><Redirect to="/login"/>} />,
          <Route exact path="/signup" render={(props)=><SignUp {...props} credencials={credencials} handleChange={this.handleChange} signupf={this.signupf} signinLink={signinLink}/>}/>,
          <Route exact path="/login" render={(props)=><SignIn {...props} credencials={credencials} handleChange={this.handleChange} loginf={this.loginf} signupLink={signupLink}/>} />,
          <Route exact path="/assessor" render={(props)=><Redirect to="/login"/>} />,
          <Route exact path="/assignment" render={(props)=><Redirect to="/login"/>} />
        ]
    }

    return (
      <BrowserRouter>
        <div className="App">
          {routeList}
        </div>
      </BrowserRouter>
    )
  }
}
export default App;
