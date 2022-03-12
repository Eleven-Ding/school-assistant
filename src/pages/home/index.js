import React, { memo } from "react";
import { NavBar } from "antd-mobile";

export default memo(function HomePage() {
  return (
    <>
      <NavBar style={{ backgroundColor: "white" }} back={null}>
        首页
      </NavBar>
      <h1>首页</h1>
    </>
  );
});
