import { combineReducers } from "redux-immutable";
import {
  CHANGE_AIM_USER,
  CHANGE_ALL_MESSAGES,
  CHANGE_ARTICLE_LIST,
  CHANGE_COMMENT_LIST,
  CHANGE_CONNECT,
  CHANGE_EXTRA,
  CHANGE_GET_DATA,
  CHANGE_OTHER_USER_INFO,
  SET_PAGE,
  SET_SCROLL_TOP,
  SHOW_MASK,
  USER_INFO,
} from "./constant";
const homeDefaultState = {
  showMask: false,
  userInfo: {},
  otherUserInfo: {},
  articleList: [],
  page: 1,
  commentList: [],
  shouldHomeGetData: false,
  scrollTop: 0,
  socket: {},
  // 在评论区点击头像 到聊天界面的时候才会有的
  aimUser: null,
  messages: [],
  extraInfo: {},
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
    case SET_PAGE:
      return { ...state, page: action.payload };
    case CHANGE_COMMENT_LIST:
      return { ...state, commentList: action.payload };
    case CHANGE_GET_DATA:
      return { ...state, shouldHomeGetData: action.payload };
    case SET_SCROLL_TOP:
      return { ...state, scrollTop: action.payload };
    case CHANGE_CONNECT:
      return { ...state, socket: action.payload };
    case CHANGE_AIM_USER:
      return { ...state, aimUser: action.payload };
    case CHANGE_ALL_MESSAGES:
      return { ...state, messages: action.payload };
    case CHANGE_OTHER_USER_INFO:
      return { ...state, otherUserInfo: action.payload };
    case CHANGE_EXTRA:
      return { ...state, extraInfo: action.payload };
    default:
      return state;
  }
}
const cReducer = combineReducers({
  main: reducer,
});

export default cReducer;
