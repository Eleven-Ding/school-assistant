import React, { memo } from "react";
import { ProfileWrapper } from "./style";
import { SetOutline } from "antd-mobile-icons";
import { NavBar, Space } from "antd-mobile";
export default memo(function ProfilePage() {
  return (
    <ProfileWrapper>
      <NavBar
        style={{ backgroundColor: "white" }}
        back={null}
        right={
          <div style={{ fontSize: 24 }}>
            <Space style={{ "--gap": "16px" }}>
              <SetOutline />
            </Space>
          </div>
        }
      >
        个人信息
      </NavBar>
      <h1>个人信息</h1>
    </ProfileWrapper>
  );
});
