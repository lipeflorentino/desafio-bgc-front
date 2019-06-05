// Importando o React
import React, { Component } from 'react';
// Importando os components necessários da lib react-materialize

//Importando css e scss files
import './stylesheet/navbar.scss';
//Importando js files
import './javascript/open-menu.js';
import { Link } from 'react-router-dom';

    
const icon = (
  <span className="logo">
    Minion<strong>Store</strong>
  </span>
);

class Nav extends Component {
    
    render() {
        return (
            <div className="navbar-fixed">
              <nav>
                <div className="nav-wrapper">
                  <a href="/" className="brand-logo">{icon}</a>
                  <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                  <ul className="right hide-on-med-and-down">
                    <li><Link to="/loja">Loja</Link></li>
                    <li><Link to="/perfil">Perfil</Link></li>
                    <li><Link to="/carrinho">Carrinho</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                  </ul>
                  <ul className="side-nav" id="mobile-demo">
                    <li><Link to="/loja">Loja</Link></li>
                    <li><Link to="/perfil">Perfil</Link></li>
                    <li><Link to="/carrinho">Carrinho</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                  </ul>
                </div>
              </nav>
            </div>
        );
    }    
}  

export default Nav;