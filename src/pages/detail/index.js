import React, { memo, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { DetailWrapper } from "./style";
import { Image, NavBar } from "antd-mobile";
import { SpinLoading } from "antd-mobile";
import {
  EnvironmentOutline,
  HeartFill,
  EyeFill,
  FireFill,
} from "antd-mobile-icons";
import { addViews } from "@/network/model";
import { isImgage } from "@/utils/common";
export default memo(
  withRouter(function Detail(props) {
    const [item, setItem] = useState({});
    const { articleList } = useSelector(
      (state) => ({
        articleList: state.getIn(["main", "articleList"]),
      }),
      shallowEqual
    );

    useEffect(() => {
      const id = props.location.search.split("=")[1];
      if (id) {
        addViews({ article_id: id }).then((res) => {
          console.log(res);
        });
      }
      const p = articleList.find((item) => item.article_id === +id);
      setItem(p);
      console.log(p);
    }, [articleList, props.location.search]);
    return (
      <DetailWrapper>
        <NavBar
          style={{ backgroundColor: "white" }}
          onBack={() => {
            console.log("返回");
            props.history.push("/home");
          }}
        >
          详情
        </NavBar>
        <div className="detail-info">
          <div className="user-info">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={item.avator} alt="" />
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#f45a3f",
                    fontWeight: "bold",
                  }}
                >
                  {item.username}
                </div>
                <div style={{ fontSize: "12px", color: "rgb(142 142 142)" }}>
                  {item.school_name}
                </div>
              </div>
            </div>
            <span style={{ color: "rgb(142 142 142)" }}>
              {item.createTime || ""}
            </span>
          </div>
          <div className="content">{item.content}</div>
          <div className="img-video">
            {item.urls?.map((url, index) => {
              return (
                <div className="render-info" key={index}>
                  {isImgage(url) ? (
                    <Image
                      height={100}
                      fit="cover"
                      className="img"
                      src={url + "?imageView2/q/50"}
                      alt=""
                      lazy
                      placeholder={
                        <div
                          style={{
                            minHeight: "80px",
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
                    <video src={url} controls />
                  )}
                </div>
              );
            })}
          </div>
          <div className="operation">
            <div className="operation-item">
              <FireFill color="red" />
              {item.views}
            </div>
            <div className="operation-item" style={{ color: "#e14e1b" }}>
              <EnvironmentOutline /> {item.position || ""}
            </div>
          </div>
        </div>
        <h1>信息详情</h1>
      </DetailWrapper>
    );
  })
);
