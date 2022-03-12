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
export default withRouter(
  memo(function MainPage({ history }) {
    const tabs = [
      {
        key: "/home",
        title: "首页",
        icon: <AppOutline />,
        badge: Badge.dot,
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

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        history.push("/home");
      } else {
        history.push("/login");
      }
    }, [history]);
    return (
      <>
        {renderRoutes(router)}
        {history.location.pathname !== "/" &&
          history.location.pathname !== "/login" && (
            <TabBar
              style={{
                position: "fixed",
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "white",
              }}
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
              ƒ
            </TabBar>
          )}
      </>
    );
  })
);
