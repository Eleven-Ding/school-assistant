import React, { memo, useEffect } from "react";
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

import { useDispatch } from "react-redux";
const tabs = [
  {
    key: "/home",
    title: "首页",
    icon: <AppOutline />,
  },
  {
    key: "/todo",
    title: "我的待办",
    icon: <UnorderedListOutline />,
    badge: "5",
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
    badge: "99+",
  },
  {
    key: "/profile",
    title: "个人中心",
    icon: <UserOutline />,
  },
];

export default withRouter(
  memo(function MainPage({ history, location }) {
    const dispatch = useDispatch();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token && !sessionStorage.getItem("login")) {
        const socket = io("ws://localhost:3001");
        socket.emit("user_connect", token);
        sessionStorage.setItem("login", true);
        dispatch(changeConnect(socket));
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
