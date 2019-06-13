// Importando o React
import React, { Component } from 'react';
        
// Importando o Components
import Navbar from '../../components/navbar/navbar';       
import Footer from '../../components/footer/footer';    
// Importando o components
import { Link } from 'react-router-dom';
import fetch from 'cross-fetch';
import { Auth } from "aws-amplify";
// Importando css
import './cadastro-page.scss';
import './components/stylesheet/cadastro-content.scss';
import './components/stylesheet/snackbar.scss';
// Importando img
import img from './components/img/minions.png';
const api = "https://v6bkv4iee2.execute-api.us-east-1.amazonaws.com/dev/users/";
//const api = "http://localhost:3000/users/";


class Cadastro extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        email: "",
        nome: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
        newUser: null
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      
  }
  
  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.nome.length > 0 &&
      this.state.password.length > 0
    );
  }
  
  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
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
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
    }
  
    this.setState({ isLoading: false });
  }
  
  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    
    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);
  
      this.props.userHasAuthenticated(true);
      this.enviarCadastro(event);
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }
  
  enviarCadastro (event){
    event.preventDefault();
    //criptografar
    const token = this.state.password;
    console.log('chamou enviar cadastro...');
    const form = {'userId': this.state.email, 'nome': this.state.nome, 'pass_token': token};
    console.log('form: ' + JSON.stringify(form));
    fetch(api, { 
        method: 'post', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    })
      .then(response => response.json()) // retorna uma promise
      .then(result => {
          if(result.success === true){
            console.log('usuario salvo com sucesso!');
          }else{
            console.error('Failed retrieving information', JSON.stringify(result));  
            alert('ocorreu um erro ao tentar inserir usuario no banco!');
          }
      })
      .catch(err => {
      // trata se alguma das promises falhar
      console.error('Failed retrieving information', err);
      alert('ocorreu um erro!');
    });
  }
  
  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <div className="input-field col s12">
            <input id="confirmationCode" type="tel" data-length="40" name="confirmationCode" value={this.state.confirmationCode} onChange={this.handleChange} className="validate" required></input>
            <label htmlFor="nome">Confirmation Code</label>
            <p>Please check your email for the code.</p>
       </div>
        <button type="submit" disabled={!this.validateConfirmationForm()}>Verify</button>
      </form>
    );
  }
  
  renderForm() {
    return (
      <div id="cadastro-container">
          <Navbar />
          <div id="cadastro-content">
              <div className="row login-form">
                  <img src={img} className="app-logo" alt="logo"></img>
                  <p>Faça seu cadastro aqui.</p>
                  <form onSubmit={this.handleSubmit} className="col s12">
                      <div className="input-field col s12">
                          <input id="nome" type="text" data-length="40" name="nome" value={this.state.nome} onChange={this.handleChange} className="validate" required></input>
                          <label htmlFor="nome">Nome</label>
                      </div>
                      <div className="input-field col s12">
                          <input id="email" type="email" data-length="25" name="email" value={this.state.email} onChange={this.handleChange} className="validate" required></input>
                          <label htmlFor="email">Email</label>
                      </div>
                      <div className="input-field col s12">
                          <input id="password" type="password" data-length="12" name="password" value={this.state.password} onChange={this.handleChange} className="validate" required></input>
                          <label htmlFor="password">Senha</label>
                      </div>
                    <button type="submit" disabled={!this.validateForm()} className="waves-effect waves-light btn">Enviar</button>
                    <p className="p-cadastro">já tem conta? Faça aqui o <Link to="/login">login</Link></p>
                  </form>
                  <div id="snackbar">Valeu! Já já entraremos em contato.</div>
                  <div id="errorbar">Ocorreu um erro durante o envio, por favor tente novamente.</div>
                </div>
            </div>   
          <Footer />
      </div>   
    );
  }
  
  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}

export default Cadastro;