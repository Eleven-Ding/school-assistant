import { combineReducers } from "redux-immutable";
import { CHANGE_ARTICLE_LIST, SHOW_MASK, USER_INFO } from "./constant";
const homeDefaultState = {
  showMask: false,
  userInfo: {},
  articleList: [],
};

function reducer(state = homeDefaultState, action) {
  switch (action.type) {
    case SHOW_MASK:
      return { ...state, showMask: action.payload };
    case USER_INFO:
      return { ...state, userInfo: action.payload };
    case CHANGE_ARTICLE_LIST:
      return {
        ...state,
        articleList: [...state.articleList, ...action.payload],
      };
    default:
      return state;
  }
}
const cReducer = combineReducers({
  main: reducer,
});

export default cReducer;
