import React from "react";
import GoogleMapReact from "google-map-react";
import geolib from "geolib";

const AnyReactComponent = ({ icon, id }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      transform: "translate(-50%, -50%)"
    }}
  >
    <div style={{ fontSize: 20 }}>{icon}</div>
    <div className="className">#{id}</div>
  </div>
);

export default class ScootMap extends React.Component {
  static defaultProps = {
    center: { lat: 37.77, lng: -122.41 },
    zoom: 16,
    data: null,
    userLat: 37.77,
    userLng: -122.41,
    range: 300
  };

  render() {
    // console.log(
    //   geolib.getDistance(
    //     { latitude: 51.5103, longitude: 7.49347 },
    //     { latitude: "51° 31' N", longitude: "7° 28' E" }
    //   )
    // );
    return (
      <div style={{ width: this.props.width, height: this.props.height }}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.data &&
            this.props.data.scooters.map(each => {
              return (
                geolib.getDistance(
                  {
                    latitude: parseFloat(this.props.userLat) || 37.77,
                    longitude: parseFloat(this.props.userLng) || -122.41
                  },
                  { latitude: each.latitude, longitude: each.longitude }
                ) <= this.props.range && (
                  <AnyReactComponent
                    lat={each.latitude}
                    lng={each.longitude}
                    id={each.id}
                    icon={
                      each.vehicle_type.vehicle_class === "scooter"
                        ? "🛵"
                        : "🛴"
                    }
                  />
                )
              );
            })}
          <div lat={"37.77"} lng={"-122.41"}>
            🏠
          </div>
          <div
            lat={parseFloat(this.props.userLat)}
            lng={parseFloat(this.props.userLng)}
          >
            📍
          </div>
        </GoogleMapReact>
      </div>
    );
  }
}
