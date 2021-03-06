import React, { memo, useEffect, useState } from "react";
import { renderRoutes } from "react-router-config";
import { withRouter } from "react-router-dom";
import { TabBar, Badge } from "antd-mobile";
import router from "../router";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
  AddOutline,
} from "antd-mobile-icons";
import { changeScrollTop, changeConnect } from "../store/creators";
import io from "socket.io-client";
import { getAllMessages } from "../network/model";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { changeMessage, changeUserInfo, changeExtra } from "../store/creators";
import { getTodoList } from "../network/model";
import { getUserInfo } from "../network/model";
export default withRouter(
  memo(function MainPage({ history, location }) {
    const dispatch = useDispatch();
    const [toDocount, setTodoCount] = useState(0);
    const { socket, messages, userInfo } = useSelector(
      (state) => ({
        socket: state.getIn(["main", "socket"]),
        messages: state.getIn(["main", "messages"]),
        userInfo: state.getIn(["main", "userInfo"]),
      }),
      shallowEqual
    );
    useEffect(() => {
      getTodoList().then((res) => {
        setTodoCount(res.data.todos.length);
      });
    }, []);
    function getCount() {
      let count = 0;
      if (!messages) return 0;
      messages.forEach((item) => {
        count += item.arr.filter((message) => {
          return (
            message.from_id !== +localStorage.getItem("userId") &&
            !message.isRead
          );
        }).length;
      });
      return count;
    }
    const tabs = [
      {
        key: "/home",
        title: "首页",
        icon: <AppOutline />,
      },
      {
        key: "/todoList",
        title: "我的待办",
        icon: (active) => <UnorderedListOutline />,
        badge: toDocount,
      },
      {
        key: "/add",
        title: "发帖",
        icon: <AddOutline />,
      },

      {
        key: "/message",
        title: "我的消息",
        icon: (active) => (active ? <MessageFill /> : <MessageOutline />),
        badge: getCount(),
      },
      {
        key: "/profile",
        title: "个人中心",
        icon: <UserOutline />,
      },
    ];

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token && !sessionStorage.getItem("login")) {
        const socket = io("ws://www.dingshiyi.top:9006");
        //收到server的连接确认
        socket.on("open", () => {
          // console.log("连上了");
          // console.log(socket);
          socket.emit("user_connect", token);
          sessionStorage.setItem("login", true);
          dispatch(changeConnect(socket));
          getAllMessages().then((res) => {
            const arr = res.data?.messageMap;
            dispatch(changeMessage(arr));
          });
          socket.on("getMessage", () => {
            getAllMessages().then((res) => {
              const arr = res.data.messageMap;
              dispatch(changeMessage(arr));
            });
          });
        });
      }
      if (!token && location.pathname !== "/login") {
        history.push("/login");
      }
      window.addEventListener("beforeunload", () => {
        sessionStorage.removeItem("login", false);
      });
    }, [dispatch, history, location]);
    useEffect(() => {
      window.addEventListener("scroll", () => {
        let scrollTop = document.documentElement.scrollTop;
        dispatch(changeScrollTop(scrollTop));
      });
    }, [dispatch]);

    useEffect(() => {
      if (socket) return;
    }, [dispatch, socket]);
    return (
      <>
        {renderRoutes(router)}
        <div
          style={{
            position: "fixed",
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "white",
          }}
        >
          {history.location.pathname !== "/" &&
            history.location.pathname !== "/login" &&
            history.location.pathname !== "/detail" &&
            history.location.pathname !== "/chat" && (
              <TabBar
                safeArea
                onChange={(key) => {
                  history.push(key);
                }}
              >
                {tabs.map((item) => (
                  <TabBar.Item
                    key={item.key}
                    icon={item.icon}
                    title={item.title}
                    badge={item.badge}
                  />
                ))}
              </TabBar>
            )}
        </div>
      </>
    );
  })
);
