import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CenteredInput = ({ value }) => {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [days, setDays] = useState(7);

  const onChangeCityInput = (evt) => {
    const value = evt.target.value;
    setCityName(value);
  };

  const onChangeDaysInput = (evt) => {
    const value = evt.target.value;
    setDays(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        height: "90vh",
        marginRight: "5vh",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            color: "white",
            fontSize: 20,
          }}
        >
          Whats for the holiday later 😊 ?
        </p>
        <input
          type="text"
          onChange={onChangeCityInput}
          placeholder="City Name e.g Brisbane, Sydney, Bali."
          style={{
            padding: "10px",
            textIndent: "10px",
            fontSize: "16px",
            border: "none",
            borderRadius: "20px",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            outline: "none",
            width: "30vw",
          }}
        />
        <div>
          <input
            type="number"
            onChange={onChangeDaysInput}
            placeholder="Travel Days"
            style={{
              padding: "10px",
              textIndent: "10px",
              fontSize: "16px",
              border: "none",
              borderRadius: "20px",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
              outline: "none",
              width: "30vw",
              marginTop: "10px",
            }}
          />
        </div>
        <div>
          <button
            onClick={() => {
              navigate({
                pathname: "/result",
                search: `?city=${cityName}&days=${days}`,
              });
            }}
            style={{
              marginTop: 10,
              fontFamily: "monospace",
              color: "whitesmoke",
              backgroundColor: "#7DB09D",
              fontSize: 15,
              border: "none",
              borderRadius: "20px",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
              outline: "none",
              padding: "10px",
              width: "20vw",
            }}
          >
            Forecast Destination
          </button>
        </div>
      </div>
    </div>
  );
};

export default CenteredInput;
