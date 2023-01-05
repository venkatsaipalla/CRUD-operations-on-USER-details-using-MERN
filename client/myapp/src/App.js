import React from "react";
import "./App.css";
import User from "./components/User";

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
  integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
  crossorigin="anonymous"
/>;
const App = () => {
  return (
    <div className="full-screen" target="_blank">
      <User />
    </div>
  );
};

export default App;
