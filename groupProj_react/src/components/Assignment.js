import React, { Component, Fragment } from 'react'
import apiCall from '../util/apiCall';
import Display from './Display'
import Select from 'react-select';
import TdItem from './TdItem';


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
    assigncaremanagers=()=>{
        const endpoint = "/api/getcaremanagerassignment"
        const promise = apiCall(endpoint)
             promise.then(blob=>blob.json()).then(json=>{
            this.setState({
                assignmentdata:json.output
            })
        })
    }
    getcaremanagerassignment=(cmpk)=>{
        const endpoint = "/api/caremanagermemberinfo"
        const promise = apiCall(endpoint,'POST',{"cmpk":cmpk})
        promise.then(blob=>blob.json()).then(json=>{
            this.setState({
                assignedlist:json.output,
                fileresponse:'Upload Successful'
            })

        })
    } 

    getcaremanagerassignmentsearch=(cmpk,searchbyinfo)=>{
        const endpoint = "/api/caremanagermembersearch"
        const promise = apiCall(endpoint,'POST',{"cmpk":cmpk,"searchby":searchbyinfo})

        promise.then(blob=>blob.json()).then(json=>{
            this.setState({
                assignedlist:json.output,
                searchby:searchbyinfo,
                members:json.output
            })
        })
    }

    getcaremanagerassignmenttotals=(cmpk)=>{
        const endpoint = "/api/caremanagermemberassignedtotals"
        const promise = apiCall(endpoint,'POST',{"cmpk":cmpk})
        promise.then(blob=>blob.json()).then(json=>{
             this.setState({
                assignedtotals:json.output[0]['assignedtotal'],
            })
        })
    } 

    getcaremanagers=()=>{
        const endpoint = "/api/caremanagerallinfo"
        const promise = apiCall(endpoint)

        promise.then(blob=>blob.json()).then(json=>{
            const cmlist=[]
            cmlist.push(json.output)
            this.setState({
               caremanagerlist:json.output
            })
        })
    }       
    
    componentDidMount(){
        this.getcaremanagers()   
     }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        for (var key in selectedOption){
            if (key==='value'){
                this.setState({cmselect:selectedOption[key]})

            }
        }
     };
    
    getMembers(name) {
        const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/${name}/members`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
            this.setState({
                members: json.members,
           })
        })
    }
    getSingleMembers(name,membername) {
        const endpoint = '/api/caremanagersinglememberinfo'
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
            isShow: true
        })
        this.getMembers(name)
    }

    onClickHandlerMember = (name,membername)=>{
        this.setState({
            manager: name,
            isShow: false
        })
        this.getSingleMembers(name,membername)
    }
    
    render() {
        
        let output = (<div></div>)
        let bttn = (<button></button>)
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
                    this.state.populatelistflag=false
                }
            }
        }
        let outputtable=(
        <div className="searchbox">
            <div style={{paddingRight:"12px"}}>Search Data:</div>
            <input  id="searchtext" placeholder="SEARCH DATA" autoComplete="off" onChange={(event)=>{
                if (document.getElementById('searchtext').value===''||document.getElementById('searchtext').value===null){
                    this.getcaremanagerassignment(this.state.cmselect)
                } else{
                    this.getcaremanagerassignmentsearch(this.state.cmselect,document.getElementById('searchtext').value)
                }
                }}>
            </input>
        </div>)
        
        let tdetail=null 
        if(this.state.fileresponse==='Upload Successful'){ 

            tdetail= (
                <TdItem
                    assignedlist={this.state.assignedlist}
                    onClickHandlerMember={this.onClickHandlerMember}
                />
            )
           }  

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
                    if(this.state.cmselect===null){
                        alert("You need to select a Care Manager")
                    } else{
                        this.getcaremanagerassignment(this.state.cmselect)
                        this.getcaremanagerassignmenttotals(this.state.cmselect)
                        this.onClickHandler(
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
                        <div className="table-wrap">
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
