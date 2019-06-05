// Importando o React
import React from 'react';
// Importando o React Dom para injetar o <APP /> na tag <div id="root"></div> do index.html
import ReactDOM from 'react-dom';
// Importando o components
import App from './App.js';
import Login from './pages/login/login-page.js';
import Cadastro from './pages/cadastro/cadastro-page.js';
import Loja from './pages/loja/loja-page.js';
import Perfil from './pages/perfil/perfil-page.js';
import Carrinho from './pages/carrinho/carrinho-page.js';
// Impotando react router
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Importando o css
import './index.css';


// Renderizando o component APP (com seus sub componenets e etc) em <div id="root"></div> do index.html
ReactDOM.render(
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/perfil" component={Perfil} />
            <Route path="/login" component={Login} />
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/carrinho" component={Carrinho} />
            <Route path="/loja" component={Loja} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));