import React, { Component, Fragment } from 'react'
import apiCall from '../util/apiCall';
import Home from './Home';
import Display from './Display'
import Select from 'react-select';


export default class Assignment extends Component {
    state = {
        newManager: this.props.newManager,
        members: [],
        isShow: false,
        manager: null,
        assignmentdata:null,
        caremanagerlist:null,
        selectcaremanagerlist:[],
        selectedOption:null,
        cmselect:null,
        populatelistflag:true,
        assignedlist:null,
        fileresponse:null
    }
    /*Eric Hall's Added functions on 06/27/2019 */
    assigncaremanagers=()=>{
        const endpoint = "/api/getcaremanagerassignment"
        const promise = apiCall(endpoint)
           console.log('in api call function')
           promise.then(blob=>blob.json()).then(json=>{
            console.log('inside function')
            console.log(json)
            this.setState({
                assignmentdata:json.output
                
            })
            
           })}
    getcaremanagerassignment=(cmpk)=>{
        const endpoint = "/api/caremanagermemberinfo"
        const promise = apiCall(endpoint,'POST',{"cmpk":cmpk})
            console.log('in api call function')
            promise.then(blob=>blob.json()).then(json=>{
            console.log('inside function')
            console.log(json)
                this.setState({
                    assignedlist:json.output,
                    fileresponse:'Upload Successful'
                })
                console.log(this.state.assignedlist)
               })
    
        } 

    getcaremanagers=()=>{
        const endpoint = "/api/caremanagerallinfo"
        const promise = apiCall(endpoint)
           console.log('in api call function')
           promise.then(blob=>blob.json()).then(json=>{
            console.log('inside function')
            console.log(json.output)
            const cmlist=[]
            cmlist.push(json.output)
            console.log(cmlist)
            console.log('checking list1')
            
            console.log('checking list2')


            
            this.setState({
                caremanagerlist:json.output
                
            })
            console.log(this.state.caremanagerlist)
            
           })}       
           componentDidMount(){
            this.getcaremanagers()   
            console.log('did mount')
            
            
          }

          handleChange = selectedOption => {
            this.setState({ selectedOption });
            for (var key in selectedOption){
                if (key==='value'){
                    this.setState({cmselect:selectedOption[key]})
                console.log(key, selectedOption[key]);
                console.log('dropdownchange')
                console.log(this.state.cmselect)
                }
                
                }
            console.log(`Option selected:`, selectedOption);
          };

    /*End Change*/
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
        console.log("NewAssessor Props:",this.props.newAssessor)
 
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
                <div className="inpt-box"><button  onClick={(event)=>{
               
                this.assigncaremanagers()
            }}>Assign Members</button></div>
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
