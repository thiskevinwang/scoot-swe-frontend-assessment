// @flow
import React from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";

const COLUMNS = [
  {
    dataField: "id",
    text: "ID",
    sort: true
  },
  {
    dataField: "current_location_id",
    text: "Current Location Id",
    sort: true
  },
  {
    dataField: "home_location_id",
    text: "Home Location Id",
    sort: true
  },
  {
    dataField: "physical_scoot_id",
    text: "Physical Scoot Id",
    sort: true
  },
  {
    dataField: "is_charging",
    text: "Is Charging",
    sort: true
  },
  {
    dataField: "latitude",
    text: "Latitude",
    sort: true
  },
  {
    dataField: "longitude",
    text: "Longitude",
    sort: true
  },
  {
    dataField: "is_at_scoot_stop?",
    text: "Is At Scoot Stop?",
    sort: true
  },
  {
    dataField: "batt_pct_smoothed",
    text: "Batt PCT Smoothed?",
    sort: true
  }
];

type Scooters = Array<{
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
}>;

export default function ScootTable({ data }: { data: Scooters }) {
  return (
    <Grid
      className="table"
      style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
    >
      {data ? (
        <BootstrapTable
          keyField="id"
          data={data}
          columns={COLUMNS}
          pagination={paginationFactory()}
        />
      ) : (
        <LinearProgress />
      )}
    </Grid>
  );
}
