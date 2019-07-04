import React, { Component } from 'react'
import TdProps from './TdProps'


export default class TdItem extends Component {
    render() {
        return this.props.assignedlist.map((assigndata, index) => (
            <TdProps key={index} assigndata={assigndata}  onClickHandlerMember={this.props.onClickHandlerMember} />   
        ))  
    }
}
