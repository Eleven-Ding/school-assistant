import React, { memo, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Image, NavBar } from "antd-mobile";
import { AddOutline } from "antd-mobile-icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeAimUser } from "../../store/creators";
import { changeExtra, changeUserInfo } from "../../store/creators";
import { getUserInfo } from "../../network/model";
export default memo(
  withRouter(function TodoPage({ history, location }) {
    const [type, setType] = useState(1);
    const [renderList, setRenderList] = useState([]);
    const dispatch = useDispatch();
    const { extraInfo } = useSelector(
      (state) => ({
        extraInfo: state.getIn(["main", "extraInfo"]),
      }),
      shallowEqual
    );
    useEffect(() => {
      getUserInfo().then((res) => {
        if (!res) return;
        const { userInfo, articles, browsers, follow, befollow } = res.data;
        dispatch(changeUserInfo(userInfo));
        dispatch(changeExtra({ browsers, articles, follow, befollow }));
      });
    }, [dispatch]);
    useEffect(() => {
      const type = location.search.split("=")[1];
      setType(type);
      if (!extraInfo.follow) return;
      if (+type === 1) {
        setRenderList(extraInfo.befollow);
      } else {
        setRenderList(extraInfo.follow);
      }
    }, [extraInfo, location.search]);
    useEffect(() => {
      if (!extraInfo.follow) return;
    }, [extraInfo]);
    return (
      <>
        <NavBar
          style={{ backgroundColor: "white" }}
          onBack={() => {
            history.goBack();
          }}
          right={<AddOutline style={{ fontSize: 24 }} />}
        >
          {+type === 1 ? "谁关注了我" : "我的关注"}
        </NavBar>
        {renderList.map((item) => {
          return (
            <div
              key={item.id}
              className="follow"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 3px",
              }}
              onClick={() => {
                const { avator, id, username } = item.userInfo;
                dispatch(changeAimUser({ id, username, avator }));
                history.push("/other");
              }}
            >
              <Image
                width={40}
                height={40}
                style={{ borderRadius: "20px" }}
                src={item.userInfo?.avator}
              ></Image>
              <span
                style={{ color: "orange", margin: "0 10px", fontSize: "16px" }}
              >
                {item.userInfo?.username}
              </span>
            </div>
          );
        })}
      </>
    );
  })
);
