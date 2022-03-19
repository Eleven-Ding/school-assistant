import styled from "styled-components";

export const MessageWrapper = styled.div`
  .message-item {
    background-color: #f1f1f1;
    padding: 10px 5px;
    display: flex;
    .message-info {
      flex: 1;
      .user-info {
        position: relative;
        padding-left: 5px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .username {
          margin-bottom: 10px;
        }
        .message {
          color: #8a8a8a;
          font-size: 14px;
        }
      }
      .time {
        color: #8a8a8a;
        font-size: 12px;
        position: absolute;
        right: 4px;
        bottom: 8px;
      }
      .sbot {
        color: #8a8a8a;
        font-size: 12px;
        position: absolute;
        right: 100px;
        top: 8px;
      }
    }
  }
`;
