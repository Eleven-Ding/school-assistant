import React, { memo } from "react";
import { NavBar, Swiper } from "antd-mobile";

export default memo(function HomePage() {
  const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];

  const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
      <div style={{ background: color, height: "200px" }}>{index + 1}</div>
    </Swiper.Item>
  ));

  return (
    <>
      <NavBar style={{ backgroundColor: "white" }} back={null}>
        首页
      </NavBar>
      <Swiper autoplay loop autoplayInterval={2000}>
        {items}
      </Swiper>
      <h1>首页</h1>
    </>
  );
});
