import React, { memo, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Form,
  Input,
  Toast,
  Divider,
  Dialog,
  TextArea,
  Modal,
} from "antd-mobile";
import CommentItem from "./comment";
import { CommentWrapper } from "./style";
import { addComment, getComment } from "@/network/model";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeCommentList } from "@/store/creators";
export default memo(
  withRouter(function Comment(props) {
    const [content, setContent] = useState("");
    const [reply, setReply] = useState("");
    const [visible, setVisible] = useState(false);
    const [target, setTarget] = useState({});
    const { article_id } = props;
    const dispatch = useDispatch();
    function addCommentAction() {
      if (content === "") {
        Toast.show({
          content: "请输入内容",
        });
        return;
      }
      const position = localStorage.getItem("location");
      addComment({
        content,
        article_id,
        position,
      }).then(({ status }) => {
        getComment({ article_id }).then((res) => {
          const comments = res.data.comments;
          dispatch(changeCommentList(comments));
        });
        if (status === 200) {
          setContent("");
          Toast.show({
            icon: "success",
            content: "评论成功",
          });
        }
      });
    }
    const { commentList } = useSelector(
      (state) => ({
        commentList: state.getIn(["main", "commentList"]),
      }),
      shallowEqual
    );
    useEffect(() => {
      article_id &&
        getComment({ article_id }).then((res) => {
          const comments = res.data.comments;
          dispatch(changeCommentList(comments));
        });
    }, [article_id, dispatch]);
    function handleReplay(comment) {
      setTarget(comment);
      setVisible(true);
    }
    useEffect(() => {
      setReply("");
    }, [visible]);
    function handleReplayAction() {
      if (reply === "") return;
      const father_id = target.userInfo.id;
      const level_id =
        target.level_id === -1 ? target.comment_id : target.level_id;
      const position = localStorage.getItem("location");
      addComment({
        content: reply,
        position,
        father_id,
        article_id,
        level_id,
      }).then((res) => {
        Toast.show({
          icon: "success",
          content: "回复成功",
        });
        getComment({ article_id }).then((res) => {
          const comments = res.data.comments;
          dispatch(changeCommentList(comments));
        });
      });
    }

    return (
      <CommentWrapper>
        <Divider>评论区</Divider>
        <div className="comment-list">
          {commentList?.map((comment) => {
            return (
              <div key={comment.comment_id}>
                <CommentItem comment={comment} handleReplay={handleReplay} />
                {comment.children.length !== 0 && (
                  <div
                    style={{
                      transform: "translateX(50px)",
                      backgroundColor: "rgb(242 241 241)",
                      width: "calc(100% - 50px)",
                      padding: "5px",
                    }}
                  >
                    {comment.children.map((item) => {
                      return (
                        <CommentItem
                          key={item.comment_id}
                          comment={item}
                          handleReplay={handleReplay}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="comment-bottom">
          <Form layout="horizontal">
            <Form.Item
              extra={
                <div>
                  <span onClick={addCommentAction} style={{ color: "#0a87fe" }}>
                    发送
                  </span>
                </div>
              }
            >
              <Input
                placeholder="您想说的话..."
                clearable
                value={content}
                onChange={(e) => {
                  setContent(e);
                }}
              />
            </Form.Item>
          </Form>
        </div>
        <Modal
          visible={visible}
          closeOnMaskClick
          content={
            <>
              <Input value={`回复:@${target.userInfo?.username}`} disabled />
              <TextArea
                onChange={(e) => {
                  setReply(e);
                }}
                placeholder="请输入内容"
                rows={5}
              />
            </>
          }
          closeOnAction
          onAction={() => {
            setVisible(false);
            handleReplayAction();
          }}
          onClose={() => {
            setVisible(false);
          }}
          actions={[
            {
              key: "confirm",
              text: "回复",
            },
          ]}
        />
      </CommentWrapper>
    );
  })
);
