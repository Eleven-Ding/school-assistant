import React, { memo } from "react";
import { NavBar } from "antd-mobile";

export default memo(function HomePage() {
  return (
    <>
      <NavBar style={{ backgroundColor: "white" }} back={null}>
        发布
      </NavBar>

      <h1>发布</h1>
    </>
  );
});
