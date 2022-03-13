import styled from "styled-components";

export const AddWrapper = styled.div`
  padding-bottom: 200px;
  .extra-info {
    display: flex;
    color: #757575;
    align-items: center;
    .extra-item {
      display: flex;
      align-items: center;
      margin: 10px 10px 10px 0;
    }
  }
  .overlayContent {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    margin-top: -75px;
    margin-left: -75px;
    background: white;
    border-radius: 16px;
  }
`;
