import React from "react";
import "../CSS/InfoBox.css";

const ResultBoxList = ({ places }) => {
  return (
    <div
      style={{
        height: "20vh",
        display: "flex",
      }}
    >
      {places.map((data, idx) =>
        data ? (
          <div
            key={`${idx}-${JSON.stringify(data)}`}
            style={{
              marginLeft: "20px",
              backgroundColor: "#ffffff",
              border: "none",
              borderRadius: "20px",
              padding: "6px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              width: "300px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 20 }}>{data.name}</p>
            <p>{data.address}</p>
            <p>Rating: {data.rating}</p>
          </div>
        ) : null
      )}
    </div>
  );
};

export default ResultBoxList;
