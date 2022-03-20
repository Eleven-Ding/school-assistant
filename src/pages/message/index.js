import React, { memo, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { NavBar, SwipeAction, List, Image, Badge } from "antd-mobile";
import { AddOutline } from "antd-mobile-icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { MessageWrapper } from "./style";
import { changeAimUser } from "../../store/creators";
import { updateMessages } from "../../network/model";
import { getAllMessages } from "../../network/model";
import { changeMessage } from "../../store/creators";
export default memo(
  withRouter(function MessagePage({ history }) {
    const dispatch = useDispatch();
    const { messages } = useSelector(
      (state) => ({
        messages: state.getIn(["main", "messages"]),
      }),
      shallowEqual
    );
    const rightActions = [
      {
        key: "delete",
        text: "删除",
        color: "danger",
      },
    ];
    function getNotReadCount(arr) {
      const id = +localStorage.getItem("userId");
      return arr.filter((item) => {
        return item.from_id !== id && item.isRead === 0;
      }).length;
    }
    useEffect(() => {
      getAllMessages().then((res) => {
        const arr = res.data.messageMap;
        dispatch(changeMessage(arr));
      });
    }, [dispatch]);
    return (
      <MessageWrapper>
        <NavBar
          style={{ backgroundColor: "white" }}
          back={null}
          right={<AddOutline style={{ fontSize: 24 }} />}
        >
          消息列表
        </NavBar>
        <List className="message-list">
          {messages.map((item) => (
            <SwipeAction key={item.id} rightActions={rightActions}>
              <div
                className="message-item"
                onClick={() => {
                  dispatch(changeAimUser(item.toUserInfo));
                  history.push("/chat");
                  const userId = +item.id;
                  updateMessages(userId).then((res) => {});
                }}
              >
                <Image
                  lazy
                  width={50}
                  height={50}
                  src={item.toUserInfo.avator}
                  style={{ borderRadius: 25 }}
                ></Image>

                <div className="message-info">
                  <div className="user-info">
                    <div className="username">
                      <Badge content={getNotReadCount(item.arr)}>
                        {item.toUserInfo.username}
                      </Badge>
                    </div>
                    <div className="message">
                      {item.arr[item?.arr.length - 1].message}
                    </div>
                  </div>
                  <div className="time">
                    {item.arr[item?.arr.length - 1].createTime}
                  </div>
                </div>
              </div>
            </SwipeAction>
          ))}
        </List>
      </MessageWrapper>
    );
  })
);
