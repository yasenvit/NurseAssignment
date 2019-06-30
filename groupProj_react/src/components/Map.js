import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import React, { useState } from 'react';

function Map(props) {
    const [selectedC, setSelectedC] = useState(null);
    return(
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{lat:40.650104, lng:-73.949582}}
      >
        {props.members.map((member) => (
            <Marker 
              key={member.id}
              position={{
                lat: member.mem_longitude,
                lng: member.mem_latitude
              }}
              onClick = {() => {
                setSelectedC(member);
              }}
            />
        ))}
        {selectedC && (
            <InfoWindow
              position={{
                lat: selectedC.mem_longitude+0.004,
                lng: selectedC.mem_latitude
              }}
              onCloseClick = {()=>{
                setSelectedC(null)
              }}
              >

              {/* <div>{selectedC.mem_address}</div> */}
              <div>{selectedC.mem_firstname} {selectedC.mem_lastname} <br/> {selectedC.mem_address} <br/>
              {selectedC.mem_city}, {selectedC.mem_state} {selectedC.mem_zip}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
    );
  }
  
  const WrappedMap = withScriptjs(withGoogleMap(Map));

  export default WrappedMap;