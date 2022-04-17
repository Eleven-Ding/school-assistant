import React, { memo } from "react";
import { withRouter } from "react-router-dom";
import { NavBar } from "antd-mobile";
import { AddOutline } from "antd-mobile-icons";
export default memo(
  withRouter(function TodoPage() {
    return (
      <>
        <NavBar
          style={{ backgroundColor: "white" }}
          back={null}
          right={<AddOutline style={{ fontSize: 24 }} />}
        >
          我的待办
        </NavBar>
        <h1>我的待办1</h1>
      </>
    );
  })
);
