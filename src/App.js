//@flow

import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { isMobile } from "react-device-detect";
import geolib from "geolib";
import filter from "lodash/filter";

import ScootMap from "./components/ScootMap";
import ScootTable from "./components/ScootTable";
import { APIENDPOINT } from "./constants/ApiEndpoint";

const styles = {
  appStyles: {
    padding: 15
  },
  inputStyles: {
    margin: 15
  },
  contentContainer: {
    backgroundColor: "white",
    display: "flex",
    flex: 1,
    flexDirection: isMobile ? "column" : "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    fontSize: `calc(10px + 2vmin)`,
    color: "black"
  }
};

export type Data = {
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

  _handleNumberChange = e => {
    this.setState({ [e.target.name]: parseFloat(e.target.value) });
  };

  fetchData = () => {
    fetch(APIENDPOINT)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ data });
      });
  };

  updateData = () => setInterval(this.fetchData, 5000);

  componentDidMount() {
    this.updateData();
  }
  componentWillUnmount() {
    clearInterval(this.updateData);
  }

  render() {
    let { data, lat, lng, range } = this.state;
    let dateFrom = unixTimestamp => new Date(unixTimestamp);

    let scootersWithinRange =
      data &&
      filter(
        data.scooters,
        each =>
          geolib.getDistance(
            {
              latitude: parseFloat(lat),
              longitude: parseFloat(lng)
            },
            {
              latitude: parseFloat(each.latitude),
              longitude: parseFloat(each.longitude)
            }
          ) <= range
      );

    return (
      <>
        <Grid style={styles.appStyles}>
          <div>Last updated:</div>
          <code>{data ? dateFrom(data.asof).toString() : "fetching..."}</code>
          <div style={styles.contentContainer}>
            <div
              className="map-controls"
              style={{
                display: "flex",
                flexDirection: "column",
                width: `100%`,
                maxWidth: 600
              }}
            >
              <TextField
                name={"lat"}
                type={"number"}
                label={"lat"}
                value={lat}
                style={styles.inputStyles}
                variant={"outlined"}
                onChange={e => this._handleNumberChange(e)}
              />
              <TextField
                name={"lng"}
                type={"number"}
                label={"lng"}
                value={lng}
                style={styles.inputStyles}
                variant={"outlined"}
                onChange={e => this._handleNumberChange(e)}
              />
              <TextField
                name={"range"}
                type={"number"}
                label={"range"}
                value={range}
                style={styles.inputStyles}
                variant={"outlined"}
                onChange={e => this._handleNumberChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m</InputAdornment>
                  )
                }}
              />
              <Button
                style={styles.inputStyles}
                variant={"raised"}
                onClick={() => {
                  this.fetchData();
                }}
              >
                Refresh
              </Button>
            </div>
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
          </div>
          <ScootTable data={scootersWithinRange} />
        </Grid>
      </>
    );
  }
}
