import React, { Component, Fragment } from 'react'
import apiCall from '../util/apiCall';
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
        singlemember:[],
        assignedtotals:0,
        searchby:null
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
        })
    }
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

    getcaremanagerassignmentsearch=(cmpk,searchbyinfo)=>{
        const endpoint = "/api/caremanagermembersearch"
        const promise = apiCall(endpoint,'POST',{"cmpk":cmpk,"searchby":searchbyinfo})
        console.log('in api call function')
        promise.then(blob=>blob.json()).then(json=>{
        console.log('inside function')
        console.log(json)
            this.setState({
                assignedlist:json.output,
                searchby:searchbyinfo,
                members:json.output
            })
        console.log(this.state.assignedlist)
        console.log(this.state.searchby)
        console.log('member array for search data')
        console.log(this.state.isShow)
        console.log(this.state.members)
        })
    }

    getcaremanagerassignmenttotals=(cmpk)=>{
        const endpoint = "/api/caremanagermemberassignedtotals"
        const promise = apiCall(endpoint,'POST',{"cmpk":cmpk})
        console.log('in api call function')
        promise.then(blob=>blob.json()).then(json=>{
        console.log('inside function')
        console.log(json)
            this.setState({
                assignedtotals:json.output[0]['assignedtotal'],
            })
        console.log('assigned totals')
        console.log(this.state.assignedtotals)
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
        })
    }       
    
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
        console.log("checking members list")
        console.log(this.state.members)
        if(this.state.isShow === true){
            bttn = (
                <button type="button" onClick={() =>{
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
                <button type="button" onClick={() =>{
                    this.onClickHandlerMember(
                        // document.getElementById('managerName').value
                        this.state.singlemember
                    )
                    }}>show map
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
                for(var item=0;item<re.length;item++) {
                    let cl=null
                    cl={value:re[item]['cmpk'],label:re[item]['caremanagerfirstname']+" "+re[item]['caremanagerlastname']}
                    this.state.selectcaremanagerlist.push(cl)
                    console.log(re[item]['cmpk'])
                    this.state.populatelistflag=false
                }
            }
        }
        console.log(this.state.selectcaremanagerlist)
        let outputtable=(
        <div className="searchbox">
            <div style={{paddingRight:"12px"}}>Search Data:</div>
            <input  id="searchtext" placeholder="SEARCH DATA" autoComplete="off" onChange={(event)=>{
                console.log('change event')
                console.log(this.state.searchby)
                if (document.getElementById('searchtext').value===''||document.getElementById('searchtext').value===null){
                    /*this.getAllStocks()*/
                    this.getcaremanagerassignment(this.state.cmselect)
                } else{
                    this.getcaremanagerassignmentsearch(this.state.cmselect,document.getElementById('searchtext').value)
                }
                }}>
            </input>
        </div>)
        
        let theader=(<div></div>) 
        let tdetail=null 
        if (this.state.fileresponse==='Upload Successful'){
            theader=results=>{return(
                <table>
                    <th>Care Manager</th>
                    <th>Member Last Name</th>
                    <th>Member First Name</th>
                    <th>Member Address</th>
                    <th>Member City</th>
                    <th>Member State</th>
                    <th>Member Zip</th>
                    <th>View</th>
                </table>
            )}  
            tdetail=this.state.assignedlist.map(assigndata=>{
                return(
                    <tr>
                        <td style={{textTransform:"capitalize"}}>{assigndata.caremanagerfirstname} {assigndata.caremanagerlastname}</td>
                        <td style={{textTransform:"capitalize"}}>{assigndata.mem_lastname}</td>
                        <td style={{textTransform:"capitalize"}}>{assigndata.mem_firstname}</td>
                        <td style={{textTransform:"capitalize"}}>{assigndata.mem_address}</td>
                        <td style={{textTransform:"capitalize"}}>{assigndata.mem_city}</td>
                        <td style={{textTransform:"capitalize"}}>{assigndata.mem_state}</td>
                        <td style={{textTransform:"capitalize"}}>{assigndata.mem_zip}</td>
                        <td style={{textTransform:"capitalize"}}>
                            <button onClick={()=>{
                                this.onClickHandlerMember(
                                    assigndata.cmpk,
                                    assigndata.mempk
                                )
                                }}>View Map
                            </button>
                        </td>                        
                    </tr>
                )
            })}    
    return (
        <div className="assignment">
            <div style={{width:"100%", alignItems:"center", padding:"2px"}}>
                <label >Select Care Manager</label>  
            </div>
            <div className="assignment-work">
                <div className="inpt-box">
                    <button className="btn" onClick={()=>{
                        this.assigncaremanagers()
                        alert("Members Assigned")
                        }}>Assign Members
                    </button> 
                </div>
                <div className="selectmanager">
                    <Select   id="caremanager" placeholder='SELECT CARE MANAGER'
                    value={this.cmselect}
                    onChange={this.handleChange}
                    options={this.state.selectcaremanagerlist}
                    >Select Model</Select>
                </div>
                <div className="inpt-box">
                    <button className="btn" onClick={(event)=>{
                    
                    console.log('hit button')
                    if(this.state.cmselect===null){
                        alert("You need to select a Care Manager")
                    } else{
                        this.getcaremanagerassignment(this.state.cmselect)
                        this.getcaremanagerassignmenttotals(this.state.cmselect)
                        this.onClickHandler(
                            // document.getElementById('managerName').value
                            this.state.cmselect
                        )
                    }
                    
                    
                    }}>View Assignment</button>
                </div>
            </div>
            <div style={{margin:"5px",justifyContent:"center"}}>
                
                <div><h4 style={{margin:"0px"}}>TOTAL ASSIGNED: {this.state.assignedtotals}</h4></div>

            </div>
            <div className="assignment-container">
                <div className="assignment-column-left" style={{paddingRight:"0px"}}>
                    <div className="assignment-data" >
                        {outputtable}
                        <div class="table-wrap">
                        <table className="blueTable" >
                            <thead>
                                <tr>
                                    <th>Care Manager</th>
                                    <th>Member Last Name</th>
                                    <th>Member First Name</th>
                                    <th>Member Address</th>
                                    <th>Member City</th>
                                    <th>Member State</th>
                                    <th>Member Zip</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tdetail}
                            </tbody>
                        </table>
                        </div>
                    </div>   
                </div>    
                <div className="assignment-column-right">
                    {output}
                </div>
            </div>
        </div>
    )
    }
}
