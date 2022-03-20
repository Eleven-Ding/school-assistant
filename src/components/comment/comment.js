import React, { memo } from "react";
import { withRouter } from "react-router-dom";
import { changeAimUser } from "@/store/creators";
import { useDispatch } from "react-redux";
export default memo(
  withRouter(function CommentItem({ comment, handleReplay, history }) {
    const dispatch = useDispatch();
    return (
      <div className="comment-container">
        <img
          src={comment.userInfo.avator}
          onClick={() => {
            if (comment.userInfo.id !== +localStorage.getItem("userId")) {
              dispatch(changeAimUser(comment.userInfo));
              history.push("/other");
            }
          }}
          alt=""
        ></img>
        <div className="info-right">
          <div className="container">
            <span className="username">{comment.userInfo.username}</span>
            <span className="time">{comment.create_time}</span>
            <span className="position">{comment.position}</span>
            <p className="school">{comment.userInfo.school_name}</p>
          </div>

          <div>
            {comment.father_name && (
              <span style={{ color: "#1379f7" }}>@{comment.father_name}:</span>
            )}
            {comment.content}
          </div>
          <div
            className="opearion"
            onClick={() => {
              handleReplay(comment);
            }}
          >
            回复
          </div>
        </div>
      </div>
    );
  })
);
