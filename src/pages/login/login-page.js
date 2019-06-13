// Importando o React
import React, { Component } from 'react';
        
// Importando o Components
import { Auth } from "aws-amplify";
import Footer from '../../components/footer/footer';    

// Importando o components
import $ from 'jquery';
import { Link } from 'react-router-dom';
//import { Redirect } from 'react-router-dom';

// Importando css
import './components/stylesheet/login-content.scss';
// Importando img
import img from './components/img/minions2.png';

//importando funcao para carregar info do carrinho
import { getInfoCarrinho } from './components/javascript/get_info_carrinho.js';
import { getInfoUsuario } from './components/javascript/get_info_usuario.js';
// Importando css
import './login-page.scss';
//local storage
var localStorage = require('localStorage');

class Login extends Component {
  
  constructor(props) {
      super(props);
      
      this.state = {
        isLoading: false,
        email: "",
        password: ""
      };
  }
  
  validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
  }
  
  handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
  }
  
  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
    
    try {
      await Auth.signIn(this.state.email, this.state.password);
      const userId = this.state.email;
      this.props.userHasAuthenticated(true);
      //buscar dados do usuario
      getInfoUsuario(userId, function(err, result){
        console.log('result: ' + JSON.stringify(result));
        
          if(err){
              console.log(err);
              console.log('ocorreu um erro no login!');
          }else{
              localStorage.setItem('session_user_id', userId);
              localStorage.setItem('session_user_nome', result.nome);
              localStorage.setItem('session_carrinho_id', result.carrinhoId);
              console.log('userId: ' + localStorage.getItem('session_user_id'));
              getInfoCarrinho(result.carrinhoId, function(err, result){
                  if(err){
                      console.log('carrinho vazio');
                      localStorage.setItem('session_qtd_items', 0);
                  }else{
                      localStorage.setItem('session_qtd_items', result.qtd_items);
                      console.log('carrinho retornado!');
                  }
                  $('#qtd_items').text(localStorage.getItem('session_qtd_items'));
              });
          }
      });
      this.props.history.push("/perfil");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }
  
  render() {
    
    const { isLoading } = this.state;
    
    if (isLoading) {
        //icone de loading...
        return <div className="loader-container"><div className="loader"></div></div>;
    }
    return (
      <div id="login-container">
          <div id="login-content">
              <div className="row login-form">
                  <img src={img} className="app-logo" alt="logo"></img>
                  <form onSubmit={this.handleSubmit} className="col s12">
                      <div className="input-field col s12">
                          <input id="email" type="email" name="email" value={this.state.email} onChange={this.handleChange} className="validate" required></input>
                          <label htmlFor="email">Email</label>
                      </div>
                      <div className="input-field col s12">
                          <input id="password" type="password" name="password"value={this.state.password} onChange={this.handleChange} className="validate"></input>
                          <label htmlFor="password">Password</label>
                      </div>
                    <button type="submit" disabled={!this.validateForm()} className="waves-effect waves-light btn">Entrar</button>
                    <p className="p-cadastro">não tem conta? Faça aqui o <Link to="/cadastro">cadastro</Link></p>
                    
                  </form>
                  <div id="snackbar">Valeu! Seu login foi efetuado com sucesso!</div>
                  <div id="errorbar">Ocorreu um erro durante o envio, por favor tente novamente.</div>
                </div>
          </div> 
          <Footer />
      </div>   
    );
  }
}

export default Login;