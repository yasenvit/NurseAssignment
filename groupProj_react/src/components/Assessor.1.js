import React, { Component } from 'react'
import "../App.css"

export default class Assessor extends Component {
    render() {
        return (
            <div>
                <div className="asr-row" style={{margin:"20px"}}><h3>Assessor registration</h3></div>
                <div className="asr">
                    <div className="asr-column-left">
                        <div className="asr-row">
                            <div className="asr-title" >Assessor First name</div>
                            <div className="asr-input"><input style={{width:"160px"}}></input></div>
                        </div>
                        <div className="asr-row">
                            <div className="asr-title">Assessor Last name</div>
                            <div className="asr-input"><input style={{width:"160px"}}></input></div>
                        </div>
                        <div className="asr-row">
                            <div className="asr-title">Maximum cases load</div>
                            <div className="asr-input"><input style={{width:"160px"}}></input></div>
                        </div>  
                        <div className="asr-row">
                            <div className="asr-title">Prefered zip codes</div>
                            <div className="asr-input"><input style={{width:"100px"}}></input><button style={{marginLeft:"10px", width:"50px"}}>add</button></div>
                        </div>               
                    </div>
                    <div className="asr-column-right">
                        here output
                    </div>
                </div>
            </div>
        )
    }
}

