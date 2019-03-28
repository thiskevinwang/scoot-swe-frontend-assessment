// @flow
import React from "react";

type Props = { icon: string, id: string };

export default function ScooterIcon({ icon, id, lat, lng }: { ...Props }) {
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
      <div style={{ fontSize: 24 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: "bold", color: "#FD4452" }}>
        #{id}
      </div>
    </div>
  );
}
