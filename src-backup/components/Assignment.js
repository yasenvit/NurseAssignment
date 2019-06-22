import React, { Component, Fragment } from 'react'
import apiCall from '../util/apiCall';
import Home from './Home';
import Display from './Display'


export default class Assignment extends Component {
    state = {
        members: [],
        isShow: false,
        manager: null
    }
    
    getMembers(name) {
        console.log("GET getMembers FUNCTION")
        console.log("apikey:",window.sessionStorage.getItem("apikey"))
        const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/${name}/members`
        const promise = apiCall(endpoint,'get')
          promise.then(blob => blob.json()).then (json=> {
            this.setState({
              members: json.members,
           })
        })
      }
    onClickHandler = (name)=>{
        this.setState({
            manager: name,
            isShow: !this.state.isShow
        })
        this.getMembers(name)
    }
    
    render() {
        console.log("manager:",this.state.manager)
        console.log("members state:",this.state.members)
    let output = (<div></div>)
    let bttn = (<button></button>)
    
    if(this.state.isShow === true){
        bttn = (
            <button type="button" onClick={(event) =>{
                this.onClickHandler(
                    document.getElementById('managerName').value
                )
            }}>
                back to table
            </button>
        )
        output = (
            <div className="assignment-map">
                <Display members = {this.state.members.slice(0,2)}/>
            </div>
        )
    } else {
        bttn = (
            <button type="button" onClick={(event) =>{
                this.onClickHandler(
                    document.getElementById('managerName').value
                )
            }}>
                show map
            </button>
        )
        output = (
            <div className="assignment-map">
                
            </div>
        )
    }
    return (
        <div className="assignment">
            <div className="assignment-work">
                <div className="inpt-box"><button>shuffle</button></div>
                <div className="assignment-work">
                <div className="inpt-box">
                    <input id="managerName" placeholder="manager"></input>
                </div>
                <div className="inpt-box">
                    {bttn}
                </div>
                </div>
                
            </div>
            <div className="assignment-container">
                <div>
                    some text here
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
                <div className="assignment-column">
                    <div className="assignment-data" >
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>   
                    {output}
                </div>
            </div>
        </div>
    )
    }
}
