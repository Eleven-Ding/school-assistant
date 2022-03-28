import styled from "styled-components";

export const HomeWrapper = styled.div`
  padding-bottom: 60px;
  .article-list {
    display: flex;
    .articles {
      flex: 1;
      display: flex;
      flex-direction: column;
      .article-item {
        padding: 5px;
        .user-info {
          font-family: serif;
          .create-time {
            color: #777;
          }
          display: flex;
          align-items: center;
          .username {
            font-size: 14px;
            font-weight: 700;
            color: #f45a3f;
          }
          .school {
            font-size: 12px;
            color: #8c8888;
          }
          img {
            padding: 2px;
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }
        }
        .article-info {
          margin-top: 10px;
          font-size: 12px;
          display: flex;
          justify-content: space-between;
        }

        .img-container {
          img,
          video {
            border-radius: 10px;
            width: 100%;
          }
        }
      }
    }
  }
  .adm-image {
    height: 100%;
  }
`;
