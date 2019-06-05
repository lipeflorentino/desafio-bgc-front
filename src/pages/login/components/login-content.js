// Importando o React
import React, { Component } from 'react';
        
// Importando o components
import { Link } from 'react-router-dom';
    
// Importando css
import './stylesheet/login-content.scss';
// Importando img
import img from './img/minions2.png';


class LoginContent extends Component {
  render() {
    return (
        <div id="login-content">
            <img src={img} className="app-logo" alt="logo"></img>
            <div class="row login-form">
                <form class="col s12">
                    <div class="input-field col s12">
                        <input id="email" type="email" class="validate"></input>
                        <label for="email">Email</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="password" type="password" class="validate"></input>
                        <label for="password">Password</label>
                    </div>
                  <Link className="waves-effect waves-light btn" to="/login">Entrar</Link>
                  
                </form>
              </div>
        </div>   
    );
  }
}

export default LoginContent;