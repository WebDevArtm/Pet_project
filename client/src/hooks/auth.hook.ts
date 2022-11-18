import React from "react";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

const cookies = new Cookies();
const storageName: string = "token";
const storageView: string = "view";
const secret: string = process.env.REACT_APP_SECRET || "";
const cookie = cookies.get(storageName);

let data = {
  name: "",
  role: "",
};

if (!!cookie) {
  const decoded = jwt.verify(cookie, secret);
  if (!!decoded) {
    const arr = Object.values(decoded);
    data.name = arr[0];
    data.role = arr[1];
  }
}

const viewData = JSON.parse(localStorage.getItem(storageView)!) || {
  view: false,
};

export const useAuth = () => {
  const [ready, setReady] = React.useState<boolean>(!!data.role);
  const [userRole, setUserRole] = React.useState<string>(data.role);
  const [userName, setUserName] = React.useState<string | null>(null);
  const [viewList, setViewList] = React.useState<boolean>(viewData.view);

  const login = React.useCallback(
    (name: string, role: string, isRemember?: boolean) => {
      let d = new Date();
      setUserRole(role);
      setUserName(name);
      setReady(true);
      const token = jwt.sign({ name, role }, secret);

      if (isRemember) {
        d.setHours(24 * 7);
        cookies.set(storageName, token, { path: "/", expires: d });
      } else if (isRemember === false) {
        cookies.set(storageName, token, { path: "/" });
      }
    },
    []
  );

  const view = React.useCallback(
    (view: boolean) => {
      let d = new Date();
      d.setMonth(11);
      setViewList(view);
      try {
        localStorage.setItem(storageView, JSON.stringify({ view }));
      } catch (e) {
        console.log(e);
      }
    },
    [setViewList]
  );

  const logout = React.useCallback(() => {
    setUserRole("");
    setReady(false);
    cookies.remove(storageName, { path: "/" });
    window.location.reload();
  }, []);

  React.useEffect(() => {
    if (data && data.role) {
      login(data.name, data.role);
      setReady(true);
    }
  }, [login]);

  React.useEffect(() => {
    if (viewData.view) {
      setViewList(viewData.view);
    }
  }, [setViewList]);

  return { login, logout, ready, userRole, userName, view, viewList };
};
