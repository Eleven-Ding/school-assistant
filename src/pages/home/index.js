import React, { memo, useCallback, useEffect, useState } from "react";
import {
  NavBar,
  Swiper,
  Ellipsis,
  Image,
  SpinLoading,
  Divider,
  NoticeBar,
  Tag,
} from "antd-mobile";
import { Tabs } from "antd";
import { getArticles } from "@/network/model";
import { isImgage } from "@/utils/common";
import {
  EnvironmentOutline,
  FireFill,
  CompassOutline,
  RightOutline,
} from "antd-mobile-icons";
import { HomeWrapper } from "./style";
import {
  changeArticlesList,
  changeGetData,
  changePage,
} from "@/store/creators";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";
import { column as Tags } from "../add";
const { TabPane } = Tabs;
const limit = 6;
const srcs = [
  "https://blog-1303885568.cos.ap-chengdu.myqcloud.com/img/DSY-1648466276474.webp",
  "https://blog-1303885568.cos.ap-chengdu.myqcloud.com/img/DSY-1648466344936.webp",
  "https://blog-1303885568.cos.ap-chengdu.myqcloud.com/img/DSY-1648466358300.webp",
  "https://blog-1303885568.cos.ap-chengdu.myqcloud.com/img/DSY-1648466382801.webp",
];

export default memo(
  withRouter(function HomePage({ history }) {
    const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];
    const [renderColume, setRenderColume] = useState([]);
    const [columes, setColumes] = useState([[], []]);

    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { articleList, page, scrollTop, shouldHomeGetData } = useSelector(
      (state) => ({
        articleList: state.getIn(["main", "articleList"]),
        shouldHomeGetData: state.getIn(["main", "shouldHomeGetData"]),
        page: state.getIn(["main", "page"]),
        scrollTop: state.getIn(["main", "scrollTop"]),
      }),
      shallowEqual
    );
    useEffect(() => {
      if (!articleList.length) return;
      let ids = [];
      const renderlist = articleList
        .map((article) => {
          const { tag } = article;
          if (!ids.includes(tag)) {
            ids.push(tag);
            return {
              id: tag,
              value: Tags.find((item) => item.value === tag)?.label,
            };
          }
        })
        .filter((item) => item);
      setRenderColume([{ id: -1, value: "全部" }, ...renderlist]);
    }, [articleList]);
    useEffect(() => {
      dispatch(changeGetData(true));
      getArticles({ page, limit }).then((res) => {
        dispatch(changeArticlesList(res?.data?.articles || []));

        if (res?.data?.articles?.length < limit) {
          dispatch(changeGetData(true));
        } else {
          dispatch(changeGetData(false));
        }
      });
    }, [dispatch, page]);
    useEffect(() => {
      let arr = [[], []];
      articleList.forEach((item, index) => {
        if (!Array.isArray(item.urls)) item.urls = item.urls?.split(",");
        item.firstType = isImgage(item.urls[0]) ? "img" : "video";
        arr[index % 2].push(item);
      });
      setColumes([...arr]);
    }, [articleList]);

    const items = srcs.map((src, index) => (
      <Swiper.Item key={index}>
        <div style={{ height: "200px" }}>
          <Image fit="cover" src={src}></Image>
        </div>
      </Swiper.Item>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadMore = () => {
      dispatch(changePage(page + 1));
    };

    useEffect(() => {
      let clientHeight = document.documentElement.clientHeight; //浏览器高度
      let scrollHeight = document.body.scrollHeight;
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop + clientHeight >= scrollHeight && !shouldHomeGetData) {
        dispatch(changeGetData(true));
        loadMore();
      }
    }, [dispatch, loadMore, scrollTop, shouldHomeGetData]);
    const [currentKey, setCurrentKey] = useState("-1");
    return (
      <HomeWrapper>
        <NavBar style={{ backgroundColor: "white" }} back={null}>
          首页
        </NavBar>
        <NoticeBar
          content={"新功能 《导航收藏》  功能已经上线"}
          color="alert"
        />
        <div className="other-opt"></div>
        <Swiper autoplay loop autoplayInterval={2000}>
          {items}
        </Swiper>
        <Divider>导航收藏</Divider>
        <NoticeBar
          style={{ "--border-color": "#a1ddff" }}
          color="info"
          extra={
            <RightOutline
              onClick={() => history.push("/target")}
              style={{ fontSize: 18 }}
            />
          }
          icon={<CompassOutline onClick={() => history.push("/target")} />}
          content={
            <div onClick={() => history.push("/target")}>
              导航收藏 -------点击进入
            </div>
          }
        />
        <Divider>最新帖子</Divider>
        <Tabs
          defaultActiveKey="-1"
          onChange={(e) => {
            setCurrentKey(e);
          }}
        >
          {renderColume?.map((item) => {
            return <TabPane tab={item.value} key={item.id}></TabPane>;
          })}
        </Tabs>
        <div className="article-list">
          {columes.map((colume, index1) => {
            return (
              <div className="articles" key={index1}>
                {colume
                  .filter((p) => {
                    if (currentKey == "-1") return p;
                    return p.tag == currentKey;
                  })
                  .map((item, index) => {
                    return (
                      <div
                        className="article-item"
                        onClick={() => {
                          history.push(`/detail?id=${item.article_id}`);
                        }}
                        key={index}
                      >
                        <div className="user-info">
                          <img src={item.avator} alt="" />
                          <div>
                            <div>
                              <span className="username">{item.username}-</span>
                              <span className="school">{item.school_name}</span>
                            </div>
                            <span className="create-time">
                              {item.createTime}
                            </span>
                          </div>
                        </div>
                        <div className="img-container">
                          {item.firstType === "img" ? (
                            <Image
                              fit="cover"
                              className="img"
                              src={item.urls[0] + "?imageView2/q/10"}
                              alt=""
                              lazy
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
                            <video src={item.urls[0]} controls />
                          )}
                        </div>
                        <div className="content">
                          <Ellipsis
                            content={item.content || ""}
                            rows={5}
                            expandText="展开"
                            direction="end"
                            collapseText="收起"
                          />
                        </div>
                        <div className="article-info">
                          <div className="info-item">
                            <FireFill color="red" />
                            {item.views}
                          </div>
                          {item.position && (
                            <div className="info-item">
                              <EnvironmentOutline />
                              {item.position}
                            </div>
                          )}
                        </div>
                        <div className="info-item">
                          <Tag color="success">
                            {Tags.find((tag) => tag.value == item.tag).label}
                          </Tag>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </HomeWrapper>
    );
  })
);
