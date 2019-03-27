//@flow

import React, { Component } from "react";
import ScootMap from "./components/ScootMap";
import "./App.css";
import { APIENDPOINT } from "./constants/ApiEndpoint";

type Data = {
  user_id: string,
  asof: number,
  scooter_ids: Array<number>,
  scooters: Array<{
    id: number,
    access_group: {
      name: string,
      id: number
    },
    current_location_id: number,
    home_location_id: number,
    physical_scoot_id: string,
    is_charging: true,
    latitude: string,
    longitude: string,
    "is_at_scoot_stop?": boolean,
    batt_pct_smoothed: number,
    vehicle_type: {
      id: number,
      bit_code: number,
      name: string,
      const: string,
      vehicle_class: string
    },
    "free_first_half_hour?": boolean,
    public_name: string,
    estimated_range: number,
    street_parkable: boolean,
    is_public: boolean,
    next_street_cleaning: string
  }>
};

type State = { data: { ...Data } };

class App extends Component<null, { ...State }> {
  constructor() {
    super();

    this.state = {
      data: null,
      lat: 37.77,
      lng: -122.41
    };
  }

  componentDidMount() {
    fetch(APIENDPOINT)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ data });
      });
  }

  render() {
    let { data, lat, lng } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <div className="controls">
            <input
              name={"lat"}
              value={lat}
              onChange={e => {
                this.setState({ lat: e.target.value });
              }}
            />
            <input
              name={"lng"}
              value={lng}
              onChange={e => {
                this.setState({ lng: e.target.value });
              }}
            />
          </div>
          <ScootMap width={600} height={400} data={data} />

          <div>{APIENDPOINT}</div>
        </div>
      </div>
    );
  }
}

export default App;
