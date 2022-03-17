import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavBar, Form, Input } from "antd-mobile";
import { ChatWrapper } from "./style";
export default memo(function Chat() {
  const [message, setMesaage] = useState("");
  const history = useHistory();
  const { aimUser, socket } = useSelector(
    (state) => ({
      aimUser: state.getIn(["main", "aimUser"]),
      socket: state.getIn(["main", "socket"]),
    }),
    shallowEqual
  );
  useEffect(() => {
    if (aimUser === null) {
      history.push("/home");
    }
  }, [aimUser, history]);
  function sendMessage() {
    if (!message) return;
    const params = {
      from: localStorage.getItem("userId"),
      to: aimUser.id,
      // 文本
      type: 0,
      message,
    };
    socket.emit("message", JSON.stringify(params));
  }
  return (
    <ChatWrapper>
      <NavBar
        style={{ backgroundColor: "white" }}
        onBack={() => {
          history.goBack();
        }}
      >
        <span> {aimUser?.username}</span>
      </NavBar>
      <div className="chat-container ">233</div>
      <div className="comment-bottom">
        <Form layout="horizontal">
          <Form.Item
            extra={
              <div>
                <span
                  onClick={() => {
                    sendMessage();
                  }}
                  style={{ color: "#0a87fe" }}
                >
                  发送
                </span>
              </div>
            }
          >
            <Input
              placeholder="您想说的话..."
              clearable
              value={message}
              onChange={(e) => {
                setMesaage(e);
              }}
            />
          </Form.Item>
        </Form>
      </div>
    </ChatWrapper>
  );
});
