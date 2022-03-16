import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Axios from "axios";

import io from "socket.io-client";

// 连接服务器, 得到与服务器的连接对象
const socket = io("ws://localhost:3001");
// 绑定监听, 接收服务器发送的消息
socket.on("message", function (data) {
  console.log("客户端接收服务器发送的消息", data);
});

// 发送消息
socket.emit("message", JSON.stringify({ name: "abc" }));

Axios.get("https://www.dingshiyi.top:9002/user/get_position").then((res) => {
  const { position } = res.data.data;
  const local = `${position.province}-${position.city}`;
  localStorage.setItem("location", local);
});
ReactDOM.render(<App />, document.getElementById("root"));
