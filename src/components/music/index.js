import React, { memo } from "react";
import { withRouter } from "react-router-dom";
import { NavBar } from "antd-mobile";
import { AddOutline } from "antd-mobile-icons";
export default memo(
  withRouter(function MusicPage({ history }) {
    return (
      <>
        <NavBar
          onBack={() => {
            history.goBack();
          }}
          style={{ backgroundColor: "white" }}
        >
          音乐大厅
        </NavBar>
      </>
    );
  })
);
