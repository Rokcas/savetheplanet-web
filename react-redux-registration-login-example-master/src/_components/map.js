import React from "react";
import { Map, GoogleApiWrapper, Polygon } from "google-maps-react";
import { getData } from "./tempData";
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

const geoJsonToCoords = geoJson =>
  geoJson.geometry.coordinates[0].map(coords => ({
    lat: coords[0],
    lng: coords[1]
  }));

class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: getAreaInfo()
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
          {this.state.areas.map((obj, index) => (
            <Polygon                                      // Škiela duos tik poligonus
              paths={geoJsonToCoords(obj)}
              strokeColor="#FF0000"
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor="#FF0000"
              fillOpacity={0.35}
              key={index}
            />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyNJ3YFC0jTvxEBj5uSU1mc7kjNIcZqck"
})(MapChart);
