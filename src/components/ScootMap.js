import React from "react";
import GoogleMapReact from "google-map-react";
import forEach from "lodash/forEach";

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      display: "flex",
      textAlign: "center",
      fontSize: 20,
      alignItems: "center",
      justifyContent: "center",
      transform: "translate(-50%, -50%)"
    }}
  >
    {text}
  </div>
);

export default class ScootMap extends React.Component {
  static defaultProps = {
    center: { lat: 37.77, lng: -122.41 },
    zoom: 11,
    data: null
  };

  render() {
    return (
      <div style={{ width: this.props.width, height: this.props.height }}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.data &&
            this.props.data.scooters.map(each => (
              <AnyReactComponent
                lat={each.latitude}
                lng={each.longitude}
                text={"📍"}
              />
            ))}
          {/* <div lat={"37.77"} lng={"-122.41"} text={"📍"}>
            📍
          </div>
          <div lat={"36.77"} lng={"-122.41"} text={"📍"}>
            📍
          </div> */}
        </GoogleMapReact>
      </div>
    );
  }
}
