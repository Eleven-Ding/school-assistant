import styled from "styled-components";

export const CommentWrapper = styled.div`
  padding-bottom: 70px;
  overflow: hidden;
  .comment-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .comment-list {
    .chilren {
      heigth: 50px;
      border: 1px solid #ccc;
      padding-left: 50px;
    }
  }
  .comment-container {
    margin: 10px 0;
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .info-right {
      margin-left: 10px;
      .container {
        .username {
          color: #f45a3f;
          font-size: 16px;
        }
        .time,
        .position {
          font-size: 12px;
          color: #8f8b8b;
          margin-left: 5px;
        }
        .school {
          padding: 0;
          margin: 2px 0 10px 0;
          color: #8f8b8b;
        }
      }
      .opearion {
        padding: 5px 0;
        color: #0096f4;
      }
    }
  }
`;
