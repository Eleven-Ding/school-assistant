import React, { memo, useCallback, useEffect, useState } from "react";
import {
  NavBar,
  Swiper,
  Ellipsis,
  Image,
  SpinLoading,
  Card,
  Divider,
} from "antd-mobile";
import { getArticles } from "@/network/model";
import { isImgage } from "@/utils/common";
import { EnvironmentOutline, EyeOutline, FireFill } from "antd-mobile-icons";
import { HomeWrapper } from "./style";
import {
  changeArticlesList,
  changeGetData,
  changePage,
} from "@/store/creators";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";
const limit = 6;
const srcs = [
  "https://blog-1303885568.cos.ap-chengdu.myqcloud.com/img/DSY-1648466276474.webp",
  "https://blog-1303885568.cos.ap-chengdu.myqcloud.com/img/DSY-1648466344936.webp",
  "https://blog-1303885568.cos.ap-chengdu.myqcloud.com/img/DSY-1648466358300.webp",
  "https://blog-1303885568.cos.ap-chengdu.myqcloud.com/img/DSY-1648466382801.webp",
];
const otherOptInfo = [
  {
    text: "音乐厅",
    link: "/music",
    img: "https://img95.699pic.com/photo/40081/7983.jpg_wh300.jpg",
  },
  {
    text: "待做列表",
    link: "/todoList",
    img: "https://todolist.london/wp-content/uploads/2020/01/To-Do-List-Logo-for-Facebook.jpg",
  },
  {
    text: "导航列表",
    link: "/target",
    img: "https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*7BUOQYDiEr0AAAAAAAAAAABkARQnAQ",
  },
  {
    text: "其他",
    link: "/tother",
    img: "https://todolist.london/wp-content/uploads/2020/01/To-Do-List-Logo-for-Facebook.jpg",
  },
];
export default memo(
  withRouter(function HomePage({ history }) {
    const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];
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

    return (
      <HomeWrapper>
        <NavBar style={{ backgroundColor: "white" }} back={null}>
          首页
        </NavBar>
        <div className="other-opt"></div>
        <Swiper autoplay loop autoplayInterval={2000}>
          {items}
        </Swiper>
        {/* <Divider>更多功能</Divider>
        <div className="other-opt">
          {otherOptInfo.map((item, index) => {
            return (
              <div
                className="card-item"
                style={{
                  background: `url("${item.img}")`,
                  backgroundSize: "cover",
                }}
                key={index}
                onClick={() => history.push(item.link)}
              >
                {item.text}
              </div>
            );
          })}
        </div> */}
        <Divider>最新帖子</Divider>
        <div className="article-list">
          {columes.map((colume, index1) => {
            return (
              <div className="articles" key={index1}>
                {colume.map((item, index) => {
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
                          <span className="create-time">{item.createTime}</span>
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
