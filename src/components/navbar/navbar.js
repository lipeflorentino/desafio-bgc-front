// Importando o React
import React, { Component } from 'react';
// Importando os components necessários da lib react-materialize

//Importando css e scss files
import './stylesheet/navbar.scss';
//Importando js files
import './javascript/open-menu.js';
import { Link } from 'react-router-dom';

//local storage
var localStorage = require('localStorage');
    
const icon = (
  <span className="logo">
    Minion<strong>Store</strong>
  </span>
);



class Nav extends Component {
    
    render() {
        return (
          
          <div className="nav">
            <input type="checkbox" id="nav-check"></input>
            <div className="nav-header">
              <div className="nav-title">
                <a href="/" className="brand-logo">{icon}</a>
              </div>
            </div>
            <div className="nav-btn">
              <label htmlFor="nav-check">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>
            
            <div className="nav-links">
              <Link to="/loja">Loja</Link>
              <Link to="/perfil">Perfil</Link>
              <Link to="/carrinho"><span id="qtd_items"> {localStorage.getItem('session_qtd_items')}</span><i className="material-icons i-left">add_shopping_cart</i></Link>
            </div>
          </div>
            
        );
    }    
}  

export default Nav;