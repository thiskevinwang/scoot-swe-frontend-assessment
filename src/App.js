//@flow

import React, { Component } from "react";
import ScootMap from "./components/ScootMap";
import "./App.css";
import { APIENDPOINT } from "./constants/ApiEndpoint";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

const styles = {
  inputStyles: {
    margin: 15
  }
};

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
    is_charging: boolean,
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

export default class App extends Component<null, { ...State }> {
  constructor() {
    super();

    this.state = {
      data: null,
      lat: 37.77,
      lng: -122.41,
      range: 300
    };
  }

  fetchData = () => {
    fetch(APIENDPOINT)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ data });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let { data, lat, lng, range } = this.state;

    let dateFrom = unitTimestamp => new Date(unitTimestamp);

    return (
      <div className="App">
        <div style={{ color: "black" }}>{APIENDPOINT}</div>
        <div style={{ color: "black" }}>
          {data && dateFrom(data.asof).toString()}
        </div>
        <div
          className="App-header"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div className="map-container">
            <ScootMap
              width={600}
              height={400}
              data={data}
              userLat={lat}
              userLng={lng}
              range={range}
            />
          </div>

          <div
            className="map-controls"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              label={"lat"}
              value={lat}
              style={styles.inputStyles}
              variant={"outlined"}
              onChange={e => {
                this.setState({ lat: e.target.value });
              }}
            />
            <TextField
              label={"lng"}
              value={lng}
              style={styles.inputStyles}
              variant={"outlined"}
              onChange={e => {
                this.setState({ lng: e.target.value });
              }}
            />
            <TextField
              label={"range"}
              value={range}
              style={styles.inputStyles}
              variant={"outlined"}
              onChange={e => {
                this.setState({ range: e.target.value });
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>
              }}
            />
            <Button
              onClick={() => {
                this.fetchData();
              }}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
