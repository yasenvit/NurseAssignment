import React, { Component } from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import mapStyles from './mapStyles'
import WrappedMap from './Map';


export default class Display extends Component{
  render() {
console.log(this.props.members)
  return (
  <div style={{width:'50vw', height:'80vh'}}>
    <WrappedMap 
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
      libraries=geometry,drawing,places&key=${
        process.env.REACT_APP_MAP_GOOGLE_KEY
      }`}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: '100%' }} />}

      testProp="HI THIS IS A TEST PROP VALUE"
      members = {this.props.members}
    />
  </div>
  )
}
}
