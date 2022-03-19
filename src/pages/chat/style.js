import styled from "styled-components";

export const ChatWrapper = styled.div`
  padding-bottom: 60px;
  padding-top: 60px;
  .comment-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .chat-container {
    .message-item {
      display: flex;
      margin: 10px 0;
      align-items: center;
      .content {
        margin: 0 10px;
        heigth: 100%;
        border-radius: 10px;
        padding: 10px 7px;
      }
    }
    .left {
      .content {
        background-color: #a0ffa0;
      }
    }
    .right {
      flex-direction: row-reverse;
      .content {
        background-color: #d2f6fb;
      }
    }
  }
`;
