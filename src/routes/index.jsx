import React from "react";
import { Switch, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import DocumentsPage from "../pages/DocumentsPage";
import UserPage from "../pages/UserPage";

const Router = () => (
  <Switch>
    <Route exact path="/" component={WelcomePage} />
    <Route exact path="/documents" component={DocumentsPage} />
    <Route path="/user" component={UserPage} />
  </Switch>
);

export default Router;
