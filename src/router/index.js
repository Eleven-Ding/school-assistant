import React from "react";
import { Redirect } from "react-router-dom";
const Login = React.lazy((_) => import("@/pages/login/index.js"));
const Home = React.lazy((_) => import("@/pages/home/index.js"));
const Profile = React.lazy((_) => import("@/pages/profile/index.js"));
export default [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/login" />,
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
];
