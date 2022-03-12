import React, { memo } from "react";
import { withRouter } from "react-router-dom";
import { NavBar } from "antd-mobile";
import { AddOutline } from "antd-mobile-icons";
export default memo(
  withRouter(function MessagePage() {
    return (
      <>
        <NavBar
          style={{ backgroundColor: "white" }}
          back={null}
          right={<AddOutline style={{ fontSize: 24 }} />}
        >
          消息列表
        </NavBar>
        <h1>消息</h1>
      </>
    );
  })
);
