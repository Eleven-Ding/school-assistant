import React from "react";
import { Redirect } from "react-router-dom";
const Login = React.lazy((_) => import("@/pages/login/index.js"));
const Home = React.lazy((_) => import("@/pages/home/index.js"));
const Profile = React.lazy((_) => import("@/pages/profile/index.js"));
const TodoPage = React.lazy((_) => import("@/components/todoList/index.js"));
const Message = React.lazy((_) => import("@/pages/message/index.js"));
const Add = React.lazy((_) => import("@/pages/add/index.js"));
const Detail = React.lazy((_) => import("@/pages/detail/index.js"));
const Chat = React.lazy((_) => import("@/pages/chat/index.js"));
const Setting = React.lazy((_) => import("@/pages/setting/index.js"));
const OtherProfile = React.lazy((_) => import("@/pages/otherProfile/index.js"));
const Browser = React.lazy((_) => import("@/pages/browser/index.js"));
const Follow = React.lazy((_) => import("@/pages/follow/index.js"));
const MusicPage = React.lazy((_) => import("@/components/music/index.js"));
const Target = React.lazy((_) => import("@/components/target/index.js"));
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
    path: "/todoList",
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
  {
    path: "/chat",
    component: Chat,
  },
  {
    path: "/setting",
    component: Setting,
  },
  {
    path: "/other",
    component: OtherProfile,
  },
  {
    path: "/browser",
    component: Browser,
  },
  {
    path: "/follow",
    component: Follow,
  },
  {
    path: "/music",
    component: MusicPage,
  },
  {
    path: "/target",
    component: Target,
  },
];
