import React from "react";
import { useState, useEffect } from "react";

const VisitCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getVisitorCount() {
      const response = await fetch("http://localhost:9000/v1/visit-counter", {
        mode: "cors",
      });

      const data = await response.json();
      return data.visitor_count;
    }

    const interval = setInterval(() => {
      getVisitorCount()
        .then((data) => setCount(data))
        .catch((error) => console.log(error));
    }, 1000); // Fetch visitor count each second

    return () => {
      clearInterval(interval); //clear the interval when its not in home page.
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        marginRight: "5vh",
        bottom: 0,
        right: 0,
        fontFamily: "monospace",
        fontWeight: "bold",
        color: "white",
        fontSize: 32,
      }}
    >
      <p>Visitor Count, {count}</p>
    </div>
  );
};

export default VisitCounter;
