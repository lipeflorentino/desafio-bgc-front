// Importando o React
import React, { Component } from 'react';
        
// Importando o components
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// Importando css
import './stylesheet/login-content.scss';
// Importando img
import img from './img/minions2.png';

//importando funcao para carregar info do carrinho
import { getInfoCarrinho } from './javascript/get_info_carrinho.js';
import { getInfoUsuario } from './javascript/get_info_usuario.js';

//local storage
var localStorage = require('localStorage');

class LoginContent extends Component {
    
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
    state = {
        redirect: false
    }
    setRedirect = () => {
        this.setState({
          redirect: true
        });
    }
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/perfil' />;
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        //const data = new FormData(event.target);
        
        //Chamar metodo de login e autenticar usuario
        const userId = "aoiwjdq928";
        //buscar dados do usuario
        getInfoUsuario(userId, function(err, result){
            if(err){
                console.log(err);
                alert('ocorreu um erro no login!');
            }else{
                alert('logado com sucesso');
                localStorage.setItem('session_user_id', result.userId);
                localStorage.setItem('session_user_email', result.email);
                localStorage.setItem('session_user_nome', result.nome);
                localStorage.setItem('session_carrinho_id', result.carrinhoId);
                
                getInfoCarrinho(result.carrinhoId, function(err, result){
                    if(err){
                        console.log('carrinho vazio');
                        localStorage.setItem('session_qtd_items', 0);
                        console.log('qtd_items: ' + localStorage.getItem('session_qtd_items'));
                        window.location = '/perfil';
                    }else{
                        console.log('result: ' + result);
                        localStorage.setItem('session_qtd_items', result.qtd_items);
                        console.log(result.qtd_items);
                        console.log('carrinho retornado!');
                        window.location = '/perfil';
                    }
                });
            }
        });
    }
    
    render() {
        return (
            <div id="login-content">
                <div className="row login-form">
                    <img src={img} className="app-logo" alt="logo"></img>
                    {this.renderRedirect()}
                    <form onSubmit={this.handleSubmit} className="col s12">
                        <div className="input-field col s12">
                            <input id="email" type="email" name="email" className="validate" required></input>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" name="password" className="validate"></input>
                            <label htmlFor="password">Password</label>
                        </div>
                      <button type="submit" className="waves-effect waves-light btn">Entrar</button>
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