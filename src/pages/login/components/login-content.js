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
                <div className="row login-form">
                    <img src={img} className="app-logo" alt="logo"></img>
                    <form className="col s12">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate"></input>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate"></input>
                            <label htmlFor="password">Password</label>
                        </div>
                      <Link className="waves-effect waves-light btn" to="/login">Entrar</Link>
                      <p className="p-cadastro">não tem conta? Faça aqui o <Link to="/cadastro">cadastro</Link></p>
                      
                    </form>
                    <div id="snackbar">Valeu! Seu login foi efetuado com sucesso!</div>
                    <div id="errorbar">Ocorreu um erro durante o envio, por favor tente novamente.</div>
                  </div>
            </div>   
        );
    }
}

export default LoginContent;