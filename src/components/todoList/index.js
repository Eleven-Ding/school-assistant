import React, { memo } from "react";
import { withRouter } from "react-router-dom";
import { NavBar } from "antd-mobile";
import { AddOutline } from "antd-mobile-icons";
export default memo(
  withRouter(function TodoPage({ history }) {
    return (
      <>
        <NavBar
          onBack={() => {
            history.goBack();
          }}
          style={{ backgroundColor: "white" }}
        >
          我的待办
        </NavBar>
        <h1>我的待办</h1>
      </>
    );
  })
);
