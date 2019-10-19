import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100vw',
    height: '100vw',
    position: 'relative',
    margin: 0,
    padding: 0,
  };

class MapChart extends React.Component{
    render() {
        return (
            <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        );
      }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAyNJ3YFC0jTvxEBj5uSU1mc7kjNIcZqck'
  })(MapChart);