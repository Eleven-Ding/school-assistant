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

export function changeMaskType(bool) {
  return {
    type: SHOW_MASK,
    payload: bool,
  };
}

export function changeUserInfo(userInfo) {
  return {
    type: USER_INFO,
    payload: userInfo,
  };
}

export function changeArticlesList(list) {
  return {
    type: CHANGE_ARTICLE_LIST,
    payload: list,
  };
}

export function changePage(page) {
  return {
    type: SET_PAGE,
    payload: page,
  };
}

export function changeCommentList(comments) {
  return {
    type: CHANGE_COMMENT_LIST,
    payload: comments,
  };
}

export function changeGetData(bool) {
  return {
    type: CHANGE_GET_DATA,
    payload: bool,
  };
}

export function changeScrollTop(scroll) {
  return {
    type: SET_SCROLL_TOP,
    payload: scroll,
  };
}

export function changeConnect(payload) {
  return {
    type: CHANGE_CONNECT,
    payload,
  };
}

export function changeAimUser(userInfo) {
  return {
    type: CHANGE_AIM_USER,
    payload: userInfo,
  };
}

export function changeMessage(messages) {
  return {
    type: CHANGE_ALL_MESSAGES,
    payload: messages,
  };
}

export function changeOtherUserInfo(userInfo) {
  return {
    type: CHANGE_OTHER_USER_INFO,
    payload: userInfo,
  };
}

export function changeExtra(data) {
  return {
    type: CHANGE_EXTRA,
    payload: data,
  };
}
