import React from "react";
import { Context } from "../contracts/interfaces";

export const AuthContext = React.createContext<Context>({
  login() {},
  logout() {},
  ready: false,
  userRole: "",
  userName: null,
  view() {},
  viewList: false,
});
