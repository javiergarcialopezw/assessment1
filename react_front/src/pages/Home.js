import "../CSS/home.css";
import CenteredInput from "../component/centered-input";
import VisitCounter from "../component/visit-counter";
import { useEffect } from "react";

//hit the visit counter end point at the node_server
async function getHome() {
  const response = await fetch("http://localhost:9000", {
    mode: "cors",
  });

  const data = await response.json();
  return data;
}

function Home() {
  useEffect(() => {
    getHome()
      .then((_) => {})
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="Home">
      <CenteredInput />
      <VisitCounter />
    </div>
  );
}

export default Home;
