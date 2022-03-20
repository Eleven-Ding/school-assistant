import React, { memo, useEffect } from "react";
import { ProfileWrapper } from "./style";
import { SetOutline, MailFill } from "antd-mobile-icons";
import {
  NavBar,
  Space,
  Popup,
  Image,
  Divider,
  SpinLoading,
  Toast,
} from "antd-mobile";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserInfoById, addFollow } from "../../network/model";
import { changeOtherUserInfo, changeExtra } from "../../store/creators";
export default memo(
  withRouter(function ProfilePage({ history }) {
    const dispatch = useDispatch();
    const { userInfo, aimUser, extraInfo } = useSelector(
      (state) => ({
        userInfo: state.getIn(["main", "otherUserInfo"]),
        aimUser: state.getIn(["main", "aimUser"]),
        extraInfo: state.getIn(["main", "extraInfo"]),
      }),
      shallowEqual
    );

    useEffect(() => {
      if (!aimUser) {
        return history.push("/home");
      }
      getUserInfoById(aimUser.id).then((res) => {
        const { userInfo, articles, browsers, follow, befollow } = res.data;
        dispatch(changeExtra({ browsers, articles, follow, befollow }));
        dispatch(changeOtherUserInfo(userInfo));
      });
    }, [aimUser, dispatch, history]);
    return (
      <ProfileWrapper>
        <NavBar
          style={{ backgroundColor: "white" }}
          onBack={() => {
            history.goBack();
          }}
          right={
            <MailFill
              onClick={() => {
                history.push("/chat");
              }}
              style={{ fontSize: "18px" }}
            />
          }
        >
          {userInfo.username}
        </NavBar>
        <div className="profile-container">
          <img src={userInfo.avator} alt=""></img>
          <span className="username">{userInfo.username}</span>
          <span className="school">{userInfo.school_name}</span>
          <div className="user-operation">
            <div className="op-item">
              <span>{extraInfo?.befollow?.length}</span>
              <span>被关注</span>
            </div>
            <div className="op-item">
              <span>{extraInfo?.follow?.length}</span>
              <span>关注</span>
            </div>
            <div className="op-item">
              <span>{extraInfo?.browsers?.length}</span>
              <span>浏览历史</span>
            </div>
          </div>
          <div
            className="follow"
            onClick={() => {
              addFollow(aimUser.id).then((res) => {
                Toast.show({
                  content: res.message,
                });
              });
            }}
          >
            Following
          </div>
        </div>
        <Divider style={{ padding: "10px 0" }}>他/她的帖子</Divider>
        <div style={{ backgroundColor: "rgb(243 243 243)" }}>
          {extraInfo?.articles?.map((article) => {
            const url = article.urls.split(",").shift();
            const isVideo = url.includes("mp4");
            return (
              <div
                className="article"
                key={article.article_id}
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
