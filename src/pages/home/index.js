import React, { memo, useCallback, useEffect, useState } from "react";
import { NavBar, Swiper, InfiniteScroll, List, Ellipsis } from "antd-mobile";
import { getArticles } from "@/network/model";
import { isImgage } from "@/utils/common";
import { EnvironmentOutline, EyeOutline } from "antd-mobile-icons";
import { HomeWrapper } from "./style";
import { changeArticlesList } from "@/store/creators";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
let flag = false;
const limit = 7;
export default memo(function HomePage() {
  const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];
  const [page, setPage] = useState(1);
  const [columes, setColumes] = useState([[], []]);
  const dispatch = useDispatch();
  const { articleList } = useSelector(
    (state) => ({
      articleList: state.getIn(["main", "articleList"]),
    }),
    shallowEqual
  );
  useEffect(() => {
    getArticles({ page, limit }).then((res) => {
      dispatch(changeArticlesList(res.data.articles));
      if (res.data.articles.length >= limit) {
        flag = false;
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
  const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
      <div style={{ background: color, height: "200px" }}>{index + 1}</div>
    </Swiper.Item>
  ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMore = () => {
    flag = true;
    setPage((page) => {
      return page + 1;
    });
  };

  const onScroll = useCallback(() => {
    let clientHeight = document.documentElement.clientHeight; //浏览器高度
    let scrollHeight = document.body.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let distance = 50; //距离视窗还用50的时候，开始触发；
    if (scrollTop + clientHeight >= scrollHeight - distance && !flag) {
      loadMore();
    }
  }, []);
  useEffect(() => {
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeWrapper>
      <NavBar style={{ backgroundColor: "white" }} back={null}>
        首页
      </NavBar>
      <Swiper autoplay loop autoplayInterval={2000}>
        {items}
      </Swiper>
      <div className="article-list">
        {columes.map((colume, index1) => {
          return (
            <div className="articles" key={index1}>
              {colume.map((item, index) => {
                return (
                  <div className="article-item" key={index}>
                    <div className="user-info">
                      <img src={item.avator} alt="" />
                      <div>
                        <div>
                          <span className="username">{item.username}-</span>
                          <span className="school">{item.school_name}</span>
                        </div>
                        <span className="create-time">{item.createTime}</span>
                      </div>
                    </div>
                    <div className="img-container">
                      {item.firstType === "img" ? (
                        <img src={item.urls[0] + "?imageView2/q/20"} alt="" />
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
                        <EyeOutline />
                        {item.views}
                      </div>
                      {item.position && (
                        <div className="info-item">
                          <EnvironmentOutline />
                          {item.position}
                        </div>
                      )}
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
});
