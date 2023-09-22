import React from "react";
import ResultBoxList from "./result-box-list.js";
import { useCollapse } from "react-collapsed";
import { FaCloudMeatball } from "react-icons/fa";
import "../CSS/InfoBox.css";

const ResultBox = ({ data }) => {
  const { getCollapseProps, getToggleProps } = useCollapse();

  return (
    <div
      style={{
        padding: "10px",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        outline: "none",
        margin: "10px",
        marginTop: "0",
        backgroundColor: "whitesmoke",
      }}
    >
      <div
        className="header"
        {...getToggleProps()}
        style={{
          display: "flex",
          justifyItems: "flex-start",
        }}
      >
        Weather on {data.datetime} - {data.weather.description}
        <FaCloudMeatball style={{ marginLeft: "10px" }} />
      </div>
      <div {...getCollapseProps()}>
        <h4>Place To Visit</h4>
        <ResultBoxList places={data.places} />
      </div>
    </div>
  );
};

export default ResultBox;
