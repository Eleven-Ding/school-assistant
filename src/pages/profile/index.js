import React, { memo, useEffect } from "react";
import { ProfileWrapper } from "./style";
import { SetOutline } from "antd-mobile-icons";
import { getUserInfo } from "@/network/model";
import { NavBar, Space } from "antd-mobile";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeUserInfo } from "@/store/creators";
export default memo(function ProfilePage() {
  const { userInfo } = useSelector(
    (state) => ({
      userInfo: state.getIn(["main", "userInfo"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getUserInfo().then((res) => {
      console.log(res);
      dispatch(changeUserInfo(res.data.userInfo));
    });
  }, [dispatch]);
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
});
