import { CHANGE_ARTICLE_LIST, SHOW_MASK, USER_INFO } from "./constant";

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
