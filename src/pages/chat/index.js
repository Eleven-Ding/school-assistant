import React, { memo, useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavBar, Form, Input, Image } from "antd-mobile";
import { ChatWrapper } from "./style";
import { getAllMessages } from "../../network/model";
import { changeMessage } from "../../store/creators";
import { updateMessages } from "../../network/model";
export default memo(function Chat() {
  const [message, setMesaage] = useState("");
  const [renderMessage, setRenderMessage] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { aimUser, socket, messages } = useSelector(
    (state) => ({
      aimUser: state.getIn(["main", "aimUser"]),
      socket: state.getIn(["main", "socket"]),
      messages: state.getIn(["main", "messages"]),
    }),
    shallowEqual
  );
  useEffect(() => {
    if (messages.length === 0 || !aimUser) return;
    const item = messages?.find((item) => +item.id === +aimUser.id);
    item && setRenderMessage(item.arr);
  }, [aimUser, messages]);
  useEffect(() => {
    if (aimUser === null) {
      history.push("/home");
    }
  }, [aimUser, history]);
  const messageRef = useRef();
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
    setMesaage("");
    setTimeout(() => {
      getAllMessages().then((res) => {
        const arr = res.data.messageMap;
        dispatch(changeMessage(arr));
      });
      aimUser && updateMessages(aimUser.id);
    }, 100);
  }
  useEffect(() => {
    getAllMessages().then((res) => {
      const arr = res.data.messageMap;
      dispatch(changeMessage(arr));
    });
  }, [dispatch]);
  useEffect(() => {
    if (!messageRef.current) return;
    setTimeout(() => {
      window.scrollTo(0, messageRef.current?.scrollHeight || 0, 0);
    }, 10);
    aimUser && updateMessages(aimUser.id);
  }, [aimUser, messageRef, messages]);
  return (
    <ChatWrapper>
      <NavBar
        style={{
          backgroundColor: "white",
          position: "fixed",
          left: "0",
          right: "0",
          top: "0",
        }}
        onBack={() => {
          history.goBack();
        }}
      >
        <span> {aimUser?.username}</span>
      </NavBar>
      <div className="chat-container" ref={messageRef}>
        {renderMessage?.map((item) => {
          return (
            <div
              key={item.message_id}
              className={[
                "message-item",
                item.from_id === aimUser.id ? "left" : "right",
              ].join(" ")}
            >
              <Image
                style={{ borderRadius: "25px" }}
                src={item.formUser.avator}
                width={50}
                height={50}
              ></Image>
              <div className="content">{item.message}</div>
            </div>
          );
        })}
      </div>

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
