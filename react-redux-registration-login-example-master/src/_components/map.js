import React from "react";
import { Map, GoogleApiWrapper, Polygon, Marker } from "google-maps-react";
import {getData} from './tempData'
//import "regenerator-runtime/runtime";

const mapStyles = {
  width: "100vw",
  height: "100vw",
  position: "relative",
  margin: 0,
  padding: 0
};

const getAreaInfo = () => {
  return JSON.parse(getData()).features;
};

const geoJsonToCoords = (geoJson) => {
  if (geoJson.geometry.type == "Point"){
    return {
      lat: geoJson.geometry.coordinates[0],
      lng: geoJson.geometry.coordinates[1],
    }
  } else {
    return geoJson.geometry.coordinates[0].map(coords => ({
      lat: coords[0],
      lng: coords[1],
    }))
  }
}

class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: getAreaInfo(),
    };
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={4}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176 }}
        >
          {this.state.areas.map((obj, index) => {
            console.log(obj);
            console.log(geoJsonToCoords(obj));
            return obj.geometry.type == "Point" ? <Marker position={geoJsonToCoords(obj)} name={index} key={index}/> : <Polygon
              paths={geoJsonToCoords(obj)}
              strokeColor="#0000FF"
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor="#0000FF"
              fillOpacity={0.35}
              key={index}
            />
            }
          )
          }
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyNJ3YFC0jTvxEBj5uSU1mc7kjNIcZqck"
})(MapChart);
