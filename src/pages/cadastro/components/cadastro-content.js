// Importando o React
import React, { Component } from 'react';
        
// Importando o components
import { Link } from 'react-router-dom';
// Importando os components necessários da lib react-materialize

//import { Link } from 'react-router-dom';
    
// Importando css
import './stylesheet/cadastro-content.scss';
// Importando img
import img from './img/minions.png';


class CadastroContent extends Component {
    
    render() {
        return (
            <div id="cadastro-content">
                <div className="row login-form">
                    <img src={img} className="app-logo" alt="logo"></img>
                    <p>Faça seu cadastro aqui.</p>
                    <form className="col s12">
                        <div className="input-field col s12">
                            <input id="name" type="text" className="validate"></input>
                            <label htmlFor="text">Nome</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate"></input>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate"></input>
                            <label htmlFor="password">Password</label>
                        </div>
                      <Link className="waves-effect waves-light btn" to="/login">Enviar</Link>
                      <p className="p-cadastro">já tem conta? Faça aqui o <Link to="/login">login</Link></p>
                      
                    </form>
                  </div>
            </div>   
        );
    }
}

export default CadastroContent;