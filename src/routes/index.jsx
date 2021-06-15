import React from "react";
import { Switch, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import DocumentsPage from "../pages/DocumentsPage";

const Router = () => (
  <Switch>
    <Route exact path="/" component={WelcomePage} />
    <Route exact path="/documents" component={DocumentsPage} />
  </Switch>
);

export default Router;
