import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './pages/home/home-page.js';
import NotFound from './pages/notfound/not_found-page.js';
import Login from "./pages/login/login-page.js";
import Perfil from "./pages/perfil/perfil-page.js";
import Loja from "./pages/loja/loja-page.js";
import Carrinho from "./pages/carrinho/carrinho-page.js";
import Cadastro from "./pages/cadastro/cadastro-page.js";
import AppliedRoute from "./components/appliedRoute/appliedRoute.js";
import AuthenticatedRoute from "./components/authenticatedRoute/authenticatedRoute.js";
import UnauthenticatedRoute from "./components/unauthenticatedRoute/unauthenticatedRoute.js";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute  path="/login" exact component={Login} props={childProps} />
    <AuthenticatedRoute  path="/perfil" exact component={Perfil} props={childProps} />
    <UnauthenticatedRoute  path="/cadastro" exact component={Cadastro} props={childProps} />
    <AuthenticatedRoute  path="/loja" exact component={Loja} props={childProps} />
    <AuthenticatedRoute  path="/carrinho" exact component={Carrinho} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;