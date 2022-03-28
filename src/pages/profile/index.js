import React, { memo, useEffect } from "react";
import { ProfileWrapper } from "./style";
import { SetOutline, DeleteOutline } from "antd-mobile-icons";
import { NavBar, Space, Image } from "antd-mobile";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserInfo } from "../../network/model";
import { SpinLoading } from "antd-mobile";
import { Divider } from "antd-mobile";
import { changeExtra, changeUserInfo } from "../../store/creators";

export default memo(
  withRouter(function ProfilePage({ history }) {
    const { userInfo, extraInfo } = useSelector(
      (state) => ({
        userInfo: state.getIn(["main", "userInfo"]),
        extraInfo: state.getIn(["main", "extraInfo"]),
      }),
      shallowEqual
    );
    const dispatch = useDispatch();
    useEffect(() => {
      getUserInfo().then((res) => {
        if (!res) return;
        const { userInfo, articles, browsers, follow, befollow } = res.data;
        dispatch(changeUserInfo(userInfo));
        dispatch(changeExtra({ browsers, articles, follow, befollow }));
      });
      window.scrollTo(0, 0);
    }, [dispatch]);

    return (
      <ProfileWrapper>
        <NavBar
          style={{
            backgroundColor: "white",
            position: "fixed",
            left: "0",
            right: "0",
            top: "0",
          }}
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
          <Image lazy src={userInfo.avator} alt=""></Image>
          <span className="username">{userInfo.username}</span>
          <span className="school">{userInfo.school_name}</span>
          <div className="user-operation">
            <div
              className="op-item"
              onClick={() => {
                history.push(`/follow?type=1`);
              }}
            >
              <span>{extraInfo?.befollow?.length || 0}</span>
              <span>被关注</span>
            </div>
            <div
              className="op-item"
              onClick={() => {
                history.push(`/follow?type=0`);
              }}
            >
              <span>{extraInfo?.follow?.length || 0}</span>
              <span>关注</span>
            </div>
            <div
              className="op-item"
              onClick={() => {
                history.push("/browser");
              }}
            >
              <span>{extraInfo?.browsers?.length || 0}</span>
              <span>浏览历史</span>
            </div>
          </div>
        </div>
        <Divider>我的帖子</Divider>
        <div style={{ backgroundColor: "rgb(243 243 243)" }}>
          {extraInfo?.articles?.map((article) => {
            const url = article.urls.split(",").shift();
            const isVideo = url.includes("mp4");
            return (
              <div
                key={article.article_id}
                className="article"
                onClick={() => {
                  history.push(`/detail?id=${article.article_id}`);
                }}
              >
                <div className="info">
                  <div className="user">
                    <Image width={40} height={40} src={userInfo.avator}></Image>
                    <span className="username">{userInfo.username}</span>
                  </div>
                  <span>{article.createTime}</span>
                </div>
                <div className="content">{article.content}</div>
                <div>
                  {!isVideo ? (
                    <Image
                      fit="cover"
                      className="img"
                      src={url + "?imageView2/q/10"}
                      alt=""
                      lazy
                      style={{ borderRadius: "5px" }}
                      placeholder={
                        <div
                          style={{
                            minHeight: "130px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <SpinLoading color="primary" />
                        </div>
                      }
                    />
                  ) : (
                    <video style={{ width: "100%" }} src={url} controls />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ProfileWrapper>
    );
  })
);
