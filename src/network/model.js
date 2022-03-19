import request from "./index";
// 用户注册
export function userRegister({ username, password, school, email, code }) {
  return request({
    method: "post",
    url: "/user/register",
    data: {
      username,
      password,
      school,
      email,
      code,
    },
  });
}

// 用户发送邮箱
export function sendMail({ email }) {
  return request({
    method: "post",
    url: "/user/email",
    data: {
      email,
    },
  });
}

export function userLogin({ username, password }) {
  return request({
    method: "post",
    url: "/user/login",
    data: {
      username,
      password,
    },
  });
}

export function getUserInfo() {
  return request(`/user/getUserInfo`);
}

export function addArtticle({ content, urls, tag, position }) {
  return request({
    method: "post",
    url: "/article/add_article",
    data: {
      content,
      urls,
      tag,
      position,
    },
  });
}

export function getArticles({ page, limit }) {
  return request(`/article/get_articles?page=${page}&limit=${limit}`);
}

export function addViews({ article_id }) {
  return request({
    method: "post",
    url: "/article/change_view",
    data: {
      article_id,
    },
  });
}

export function addComment({
  position,
  article_id,
  content,
  father_id = -1,
  level_id = -1,
}) {
  return request({
    method: "post",
    data: {
      position,
      article_id,
      content,
      father_id,
      level_id,
    },
    url: "/article/add_comment",
  });
}

export function getComment({ article_id }) {
  return request(`/article/get_comment?article_id=${article_id}`);
}

export function getArticle({ article_id }) {
  return request(`/article/get_article?article_id=${article_id}`);
}

export function getAllMessages() {
  return request(`/message/get_all_messages`);
}

export function updateMessages(userId) {
  return request({
    method: "post",
    data: {
      userId,
    },
    url: "/message/update_message",
  });
}
