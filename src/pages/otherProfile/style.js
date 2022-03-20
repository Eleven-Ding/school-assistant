import styled from "styled-components";

export const ProfileWrapper = styled.div`
  padding-bottom: 70px;
  .profile-container {
    background-color: white;
    position: relative;
    display: flex;
    padding: 20px 0 50px 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .username {
      font-family: serif;
      font-size: 22px;
      font-weight: 600;
      padding: 5px 0 10px 0;
    }
    .user-operation {
      font-size: 17px;
      display: flex;
      width: 100%;
      margin-top: 20px;
      justify-content: space-around;
      .op-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        span:nth-child(1) {
          padding: 3px 0;
        }
        span:nth-child(2) {
          padding: 1px 0;
          color: #b5b5b5;
          font-size: 15px;
        }
      }
    }
    .follow {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      background-color: #29a7eb;
      color: white;
      padding: 6px 15px;
      font-size: 16px;
      border-radius: 20px;
      font-family: serif;
      &:hover {
        background-color: #006ca7;
      }
    }
  }
  .article {
    background-color: white;
    margin-top: 10px;
    padding: 5px;
  }
  .content {
    padding: 10px 0;
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ccc;
    img {
      border-radius: 50%;
    }
    .user {
      display: flex;
      align-items: center;
      color: orange;
      .username {
        font-size: 16px;
      }
    }
  }
`;
