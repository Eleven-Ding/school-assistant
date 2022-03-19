import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Axios from "axios";

Axios.get("https://www.dingshiyi.top:9002/user/get_position").then((res) => {
  const { position } = res.data.data;
  const local = `${position.province}-${position.city}`;
  localStorage.setItem("location", local);
});

ReactDOM.render(<App />, document.getElementById("root"));
