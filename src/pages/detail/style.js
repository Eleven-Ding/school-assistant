import styled from "styled-components";

export const DetailWrapper = styled.div`
  padding: 0 5px;
  .detail-info {
    display: flex;
    flex-direction: column;

    .content {
      padding: 10px 0;
      line-height: 18px;
    }
    .user-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        width: 45px;
        heigth: 45px;
        border-radius: 50%;
      }
    }
    .img-video {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .render-info {
        margin-top: 5px;
        width: 33%;
        .img,
        video {
          border-radius: 4px;
          width: 100%;
        }
      }
    }
  }
  .operation {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
  }
`;
