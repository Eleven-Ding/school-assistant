import React from "react";
import { Redirect } from "react-router-dom";
const Login = React.lazy((_) => import("@/pages/login/index.js"));
const Home = React.lazy((_) => import("@/pages/home/index.js"));
const Profile = React.lazy((_) => import("@/pages/profile/index.js"));
const TodoPage = React.lazy((_) => import("@/pages/todoList/index.js"));
const Message = React.lazy((_) => import("@/pages/message/index.js"));
const Add = React.lazy((_) => import("@/pages/add/index.js"));
const Detail = React.lazy((_) => import("@/pages/detail/index.js"));
export default [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/home" />,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/todo",
    component: TodoPage,
  },
  {
    path: "/message",
    component: Message,
  },
  {
    path: "/add",
    component: Add,
  },
  {
    path: "/detail",
    component: Detail,
  },
];
