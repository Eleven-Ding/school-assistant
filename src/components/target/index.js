import React, { memo } from "react";
import { withRouter } from "react-router-dom";
import { NavBar } from "antd-mobile";
export default memo(
  withRouter(function Target({ history }) {
    return (
      <>
        <NavBar
          onBack={() => {
            history.goBack();
          }}
          style={{ backgroundColor: "white" }}
        >
          导航列表
        </NavBar>
        <h1>导航列表</h1>
      </>
    );
  })
);
