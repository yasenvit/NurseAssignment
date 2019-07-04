import React, { Component } from 'react'

export default class TdProps extends Component {
    render() {

        return (
            <tr>
                <td>{this.props.assigndata.caremanagerfirstname} {this.props.assigndata.caremanagerlastname}</td>
                <td>{this.props.assigndata.mem_lastname}</td>
                <td>{this.props.assigndata.mem_firstname}</td>
                <td>{this.props.assigndata.mem_address}</td>
                <td>{this.props.assigndata.mem_city}</td>
                <td>{this.props.assigndata.mem_state}</td>
                <td>{this.props.assigndata.mem_zip}</td>
                <td>
                    <button className="smbtn" onClick={()=>{
                        this.props.onClickHandlerMember( 
                            this.props.assigndata.cmpk,
                            this.props.assigndata.mempk
                        )
                        }}>View Map
                    </button>
                </td>                        
            </tr>
        )
    }
}
