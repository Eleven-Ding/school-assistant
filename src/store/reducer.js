import { combineReducers } from "redux-immutable";
import { SHOW_MASK, USER_INFO } from "./constant";
const homeDefaultState = {
  showMask: false,
  userInfo: {},
};

function reducer(state = homeDefaultState, action) {
  switch (action.type) {
    case SHOW_MASK:
      return { ...state, showMask: action.payload };
    case USER_INFO:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}
const cReducer = combineReducers({
  main: reducer,
});

export default cReducer;
