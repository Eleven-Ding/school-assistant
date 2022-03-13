import styled from "styled-components";

export const UploadWrapper = styled.div`
  padding: 0 4px;
  .add-src {
    heigth: 80px;
    width: 80px;
    background-color: #f5f5f5;
    line-height: 80px;
    text-align: center;
    font-size: 30px;
    color: #7f7d7d;
    overflow: hidden;
    position: relative;
    p {
      font-size: 13px;
      position: abolute;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }
    input {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      opacity: 0;
    }
  }
  .preview-list {
    display: flex;
    flex-wrap: wrap;
    .preview {
      height: 100px;
      width: 30%;
      overflow: hidden;
      line-height: 80px;
      display: flex;
      align-items: center;
      object-fit: cover;
      margin: 1%;
      background-color: #ccc;
      position: relative;
      .close {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 20px;
        z-index: 999;
      }
      img {
        width: 100%;
        heigth: 100%;
      }
      video {
        height: 100%;
        width: 100%;
      }
    }
  }
`;
