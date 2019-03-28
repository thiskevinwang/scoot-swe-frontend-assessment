//@flow
import React from "react";
import GoogleMapReact from "google-map-react";
import geolib from "geolib";
import ScooterIcon from "./ScooterIcon";
import { Data, DEFAULTLAT, DEFAULTLNG } from "../App";

type Props = {
  center: {
    lat: number,
    lng: number
  },
  zoom: number,
  data?: { ...Data },
  userLat: number,
  userLng: number,
  range: number
};

export default class ScootMap extends React.Component<Props, null> {
  static defaultProps: Props = {
    center: { lat: DEFAULTLAT, lng: DEFAULTLNG },
    zoom: 14,
    data: null,
    userLat: DEFAULTLAT,
    userLng: DEFAULTLNG,
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
                    latitude: parseFloat(this.props.userLat) || DEFAULTLAT,
                    longitude: parseFloat(this.props.userLng) || DEFAULTLNG
                  },
                  { latitude: each.latitude, longitude: each.longitude }
                ) <= this.props.range && (
                  <ScooterIcon
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
          <div lat={DEFAULTLAT} lng={DEFAULTLNG}>
            <span role={"img"} aria-label={"house emoji"}>
              🏠
            </span>
          </div>
          <div
            lat={parseFloat(this.props.userLat)}
            lng={parseFloat(this.props.userLng)}
          >
            <span role={"img"} aria-label={"pin emoji"}>
              📍
            </span>
          </div>
        </GoogleMapReact>
      </div>
    );
  }
}
