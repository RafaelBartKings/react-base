import React from "react";
import { Switch } from "react-router-dom";
// import { toast } from "react-toastify";

import MyRoute from "./MyRoutes";
import Login from "../pages/Login";
import Page404 from "../pages/Page404";

export default function Routes() {
  // toast.success('Oi, sucesso', { toastId: 'successId' })
  // toast.error('Oi, error', { toastId: 'errorId' })

  return (
    <Switch>
      <MyRoute exact path="/" component={Login} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
