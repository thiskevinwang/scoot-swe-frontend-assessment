//@flow
import React from "react";
import GoogleMapReact from "google-map-react";
import geolib from "geolib";
import ScooterIcon from "./ScooterIcon";
import { type Data, DEFAULTLAT, DEFAULTLNG } from "../App";

const KEY = process.env.REACT_APP_GOOGLE_API_KEY;

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
    return (
      <div style={{ width: this.props.width, height: this.props.height }}>
        <GoogleMapReact
          bootstrapURLKeys={
            process.env.NODE_ENV === "production" && KEY != null && { key: KEY }
          }
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.data &&
            this.props.data.scooters.map((each, i) => {
              return (
                geolib.getDistance(
                  {
                    latitude: parseFloat(this.props.userLat) || DEFAULTLAT,
                    longitude: parseFloat(this.props.userLng) || DEFAULTLNG
                  },
                  { latitude: each.latitude, longitude: each.longitude }
                ) <= this.props.range && (
                  <ScooterIcon
                    key={i}
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
            <span
              style={{ fontSize: 24 }}
              role={"img"}
              aria-label={"house emoji"}
            >
              🏠
            </span>
          </div>
          <div
            lat={parseFloat(this.props.userLat)}
            lng={parseFloat(this.props.userLng)}
          >
            <span
              style={{ fontSize: 24 }}
              role={"img"}
              aria-label={"pin emoji"}
            >
              📍
            </span>
          </div>
        </GoogleMapReact>
      </div>
    );
  }
}
