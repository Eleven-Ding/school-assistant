import React, { memo } from "react";
import { withRouter } from "react-router-dom";
import { NavBar, Image, SpinLoading } from "antd-mobile";
import { AddOutline } from "antd-mobile-icons";
import { shallowEqual, useSelector } from "react-redux";
import { BrowerWraper } from "./style";
export default memo(
  withRouter(function TodoPage({ history }) {
    const { userInfo, extraInfo } = useSelector(
      (state) => ({
        userInfo: state.getIn(["main", "otherUserInfo"]),
        aimUser: state.getIn(["main", "aimUser"]),
        extraInfo: state.getIn(["main", "extraInfo"]),
      }),
      shallowEqual
    );

    return (
      <BrowerWraper>
        <NavBar
          style={{ backgroundColor: "white" }}
          onBack={() => {
            history.goBack();
          }}
        >
          浏览历史
        </NavBar>
        <div style={{ backgroundColor: "rgb(243 243 243)" }}>
          {extraInfo?.browsers?.map((article) => {
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
                    <span className="username">{article.userEmail}</span>
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
      </BrowerWraper>
    );
  })
);
