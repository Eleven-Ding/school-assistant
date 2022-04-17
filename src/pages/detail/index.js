import React, { memo, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { DetailWrapper } from "./style";
import { Image, NavBar, Dialog, Toast } from "antd-mobile";
import { SpinLoading } from "antd-mobile";
import Comment from "@/components/comment";
import { changeGetData } from "@/store/creators";
import {
  EnvironmentOutline,
  FireFill,
  DeleteOutline,
  MoreOutline,
} from "antd-mobile-icons";
import { changeAimUser } from "@/store/creators";
import {
  addViews,
  getArticle,
  addBrowser,
  deleteArticle,
} from "@/network/model";
import { isImgage } from "@/utils/common";
import res from "antd-mobile-icons/es/AaOutline";
export default memo(
  withRouter(function Detail(props) {
    const [item, setItem] = useState({});
    const [width, setWidth] = useState("98%");
    const dispatch = useDispatch();
    const { articleList } = useSelector(
      (state) => ({
        articleList: state.getIn(["main", "articleList"]),
      }),
      shallowEqual
    );
    useEffect(() => {
      dispatch(changeGetData(false));
    }, [dispatch]);

    useEffect(() => {
      const id = props.location.search.split("=")[1];

      if (id) {
        addViews({ article_id: id });
        addBrowser(id).then((res) => {});
        getArticle({ article_id: id }).then((res) => {
          const p = res.data.result;
          p.urls = p.urls?.split(",");
          setItem(p);

          if (p?.urls?.length === 2) {
            setWidth("49%");
          } else if (p?.urls?.length >= 3) {
            setWidth("33%");
          }
        });
      }
    }, [articleList, props.location.search]);
    return (
      <DetailWrapper width={width}>
        <NavBar
          style={{ backgroundColor: "white" }}
          onBack={() => {
            props.history.push("/home");
          }}
          right={
            <DeleteOutline
              onClick={() => {
                Dialog.confirm({
                  content: "确认删除该文章？",
                  onConfirm: async () => {
                    const result = await deleteArticle(item.article_id);
                    Toast.show({
                      icon: result.status !== 200 ? "fail" : "success",
                      content: result.message,
                    });
                    props.history.push("/home");
                  },
                });
                console.log("删除", item);
              }}
            />
          }
        >
          详情
        </NavBar>
        <div className="detail-info">
          <div className="user-info">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image
                src={item.avator}
                width={45}
                height={45}
                style={{ borderRadius: "50%" }}
                onClick={() => {
                  if (item.userId !== +localStorage.getItem("userId")) {
                    const { avator, userId, username } = item;
                    dispatch(changeAimUser({ id: userId, username, avator }));
                    props.history.push("/other");
                  }
                }}
                alt=""
              />
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
                      height={width === "33%" ? 100 : ""}
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
        <Comment article_id={item.article_id}></Comment>
      </DetailWrapper>
    );
  })
);
