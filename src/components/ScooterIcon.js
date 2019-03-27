// @flow
import React from "react";

type Props = { icon: string, id: string };

export default function ScooterIcon({ icon, id }: { ...Props }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={{ fontSize: 20 }}>{icon}</div>
      <div style={{ fontSize: 12, color: "white" }}>#{id}</div>
    </div>
  );
}
