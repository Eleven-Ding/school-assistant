import React, { memo } from "react";
import { ProfileWrapper } from "./style";
import { SetOutline } from "antd-mobile-icons";
import { NavBar, Space } from "antd-mobile";
import { shallowEqual, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
export default memo(
  withRouter(function ProfilePage({ history }) {
    const { userInfo } = useSelector(
      (state) => ({
        userInfo: state.getIn(["main", "userInfo"]),
      }),
      shallowEqual
    );

    return (
      <ProfileWrapper>
        <NavBar
          style={{ backgroundColor: "white" }}
          back={null}
          right={
            <div
              style={{ fontSize: 24 }}
              onClick={() => {
                history.push("/setting");
              }}
            >
              <Space style={{ "--gap": "16px" }}>
                <SetOutline />
              </Space>
            </div>
          }
        >
          个人信息
        </NavBar>
        <div className="profile-container">
          <img src={userInfo.avator} alt=""></img>
          <span className="username">{userInfo.username}</span>
          <span className="school">{userInfo.school_name}</span>
          <div className="user-operation">
            <div className="op-item">
              <span>352</span>
              <span>Likes</span>
            </div>
            <div className="op-item">
              <span>198</span>
              <span>Follow</span>
            </div>
            <div className="op-item">
              <span>125</span>
              <span>Browse</span>
            </div>
          </div>
          <div className="follow">Following</div>
        </div>
      </ProfileWrapper>
    );
  })
);
