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
        fileresponse:null,
        singlemember:[]
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

      getSingleMembers(name,membername) {
        console.log("GET getMembers FUNCTION")
        console.log("apikey:",window.sessionStorage.getItem("apikey"))
        const endpoint = '/api/caremanagersinglememberinfo'
        console.log('single member')
        console.log(endpoint)
        const promise = apiCall(endpoint,'POST',{"cmpk":name,"mempk":membername})
          promise.then(blob => blob.json()).then (json=> {
            this.setState({
              singlemember: json.output,
           })
        })
      } 
    onClickHandler = (name)=>{
        this.setState({
            manager: name,
            isShow: true//!this.state.isShow
        })
        this.getMembers(name)
    }

    onClickHandlerMember = (name,membername)=>{
        this.setState({
            manager: name,
            isShow: false//!this.state.isShow
        })
        this.getSingleMembers(name,membername)
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
                <Display members = {this.state.members}/>
            </div>
        )
    } else {
        bttn = (
            <button type="button" onClick={(event) =>{
                this.onClickHandlerMember(
                    // document.getElementById('managerName').value
                    this.state.singlemember
                )
            }}>
                show map
            </button>
        )
        output = (
            
            <div className="assignment-map">
                
                <Display members = {this.state.singlemember}/>
            </div>
        )
    }
    let re=this.state.caremanagerlist
    if(this.state.populatelistflag===true){
        if(re!==null){
            for(var item=0;item<re.length;item++)
        {
            let cl=null
            
            cl={value:re[item]['cmpk'],label:re[item]['caremanagerfirstname']+" "+re[item]['caremanagerlastname']}
            this.state.selectcaremanagerlist.push(cl)
            console.log(re[item]['cmpk'])
            this.state.populatelistflag=false
        }
        }}
        console.log(this.state.selectcaremanagerlist)
        let outputtable=(<div><h1>Data Results:</h1></div>) 
        let theader=(<div></div>) 
        let tdetail=null 
        if (this.state.fileresponse=='Upload Successful'){
            
            theader=results=>{return(
              <table><th>Care Manager</th>
              <th>Member Last Name</th>
              <th>Member First Name</th>
              <th>Member Address</th>
              <th>Member City</th>
              <th>Member State</th>
              <th>Member Zip</th>
              <th>View</th>
              </table>)}
           
            tdetail=this.state.assignedlist.map(assigndata=>{

                return(
                    <tr>
                        <td>{assigndata.caremanagerfirstname} {assigndata.caremanagerlastname}</td>
                        <td>{assigndata.memberlastname}</td>
                        <td>{assigndata.memberfirstname}</td>
                        <td>{assigndata.memberaddress}</td>
                        <td>{assigndata.membercity}</td>
                        <td>{assigndata.memberstate}</td>
                        <td>{assigndata.memberzip}</td>
                        <td><button onClick={(event)=>{
                            this.onClickHandlerMember(
                                
                                assigndata.cmpk,
                                assigndata.mempk
                            )

                        }}>
                            View Map</button></td>                        
                    </tr>
                )
            })}    
    return (
        <div className="assignment">
            <div className="assignment-work">
                <div className="inpt-box"><button  onClick={(event)=>{
               
                this.assigncaremanagers()
            }}>Assign Members</button>          
            </div>
            <div className="selectmanager">
            <label>Select Care Manager</label>
            <Select   id="caremanager" placeholder='SELECT CARE MANAGER'
                value={this.cmselect}
                onChange={this.handleChange}
                options={this.state.selectcaremanagerlist}
                >Select Model</Select>
            </div>
            <div className="inpt-box">
            <button onClick={(event)=>{
                this.getcaremanagerassignment(this.state.cmselect)
                
                this.onClickHandler(
                    // document.getElementById('managerName').value
                    this.state.cmselect
                )
                
            }}>View Assignment</button>
            </div>
                {/* <div className="assignment-work">
                <div className="inpt-box">
                    <input id="managerName" placeholder="manager"></input>
                </div>
                <div className="inpt-box">
                    {bttn}
                </div>
                </div> */}
                
            </div>
            <div className="assignment-container">
                <div className="assignment-column">
                    <p>TOTAL ASSIGNED: 0</p>
                </div>
                <div>
                    <p>TOTAL ASSIGNED FOR ZIPCODE 11207: 0</p>
                </div>
                <div className="assignment-column">
                    <div className="assignment-data" >
                    {outputtable}
                    <table className="blueTable">
                    <tbody>
                    <tr>
                    <th>Care Manager</th>
                    <th>Member Last Name</th>
                    <th>Member First Name</th>
                    <th>Member Address</th>
                    <th>Member City</th>
                    <th>Member State</th>
                    <th>Member Zip</th>
                    <th>View</th></tr>
                    {tdetail}
                    </tbody>
                        
                    
                    </table>

                    </div>   
                    {output}
                </div>
            </div>
        </div>
    )
    }
}
