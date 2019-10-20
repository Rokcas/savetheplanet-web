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

const createCirkel = (center, r) => {
  let radPart = Math.PI / 32;
  let res = [];
  console.log(center, r);

  for (let i = 0; i < 64; ++i){
    res.push({
      lat: center.lat + r * Math.sin(radPart * i),
      lng: center.lng + r * Math.cos(radPart * i),
    });
  }
  return res;
}

const colors = [
  "#FFFF00",
  "#FFa500",
  "#FF0000",
]

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
          bounds={{
            east: 120,
            north: 90,
            south: -90,
            west: -120
          }}
        >
          {this.state.areas.map((obj, index) => {
            console.log(colors[obj.properties.severity - 1]);
            return <Polygon // Škiela duos tik poligonus
              paths={createCirkel({lat: obj.geometry.coordinates[0], lng: obj.geometry.coordinates[1]}, obj.properties.radius)}
              strokeColor={colors[obj.properties.severity - 1]}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor={colors[obj.properties.severity - 1]}
              fillOpacity={0.35}
              key={index}
            />
          })}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyNJ3YFC0jTvxEBj5uSU1mc7kjNIcZqck"
})(MapChart);
