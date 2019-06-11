// Importando o React
import React, { Component } from 'react';
        
// Importando o components
import { Link } from 'react-router-dom';
import fetch from 'cross-fetch';
import { Redirect } from 'react-router-dom';
// Importando os components necessários da lib react-materialize

//import { Link } from 'react-router-dom';
    
// Importando css
import './stylesheet/cadastro-content.scss';
import './stylesheet/snackbar.scss';
// Importando img
import img from './img/minions.png';
//const api = "https://t9wyd7u0o1.execute-api.us-east-1.amazonaws.com/dev/users/";
const api = "http://localhost:3000/users/";

class CadastroContent extends Component {
    
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
          return <Redirect to='/login' />;
        }
    }

    
    handleSubmit(event) {
        event.preventDefault();
        console.log('Um cadastro foi submetido: ');
        const data = new FormData(event.target);
        this.enviarCadastro(event, data);
        
    }
    
    enviarCadastro (event, data){
        //criptografar
        const token = data.get('password');
        event.preventDefault();
        console.log('chamou enviarEmail pelo react...');
        const form = {'nome': data.get('name'), 'email': data.get('email'), 'pass_token': token, 'data_envio': new Date()};
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
                this.setRedirect();
                this.showToast();
              }else{
                this.showError();
                console.error('Failed retrieving information', JSON.stringify(result));  
              }
          })
          .catch(err => {
          // trata se alguma das promises falhar
          this.showError();
          console.error('Failed retrieving information', err);
        });
    }
    showToast(){
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
        // Add the "show" class to DIV
        x.className = "show";
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 7000);
    }
    showError(){
        // Get the snackbar DIV
        var x = document.getElementById("errorbar");
        // Add the "show" class to DIV
        x.className = "show";
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 7000);
    }
    
    render() {
        return (
            <div id="cadastro-content">
                <div className="row login-form">
                    <img src={img} className="app-logo" alt="logo"></img>
                    <p>Faça seu cadastro aqui.</p>
                    {this.renderRedirect()}
                    <form onSubmit={this.handleSubmit} className="col s12">
                        <div className="input-field col s12">
                            <input id="name" type="text" data-length="40" name="name" className="validate" required></input>
                            <label htmlFor="name">Nome</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="email" type="email" data-length="25" name="email" className="validate" required></input>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" data-length="12" name="password" className="validate" required></input>
                            <label htmlFor="password">Senha</label>
                        </div>
                      <button type="submit" className="waves-effect waves-light btn">Enviar</button>
                      <p className="p-cadastro">já tem conta? Faça aqui o <Link to="/login">login</Link></p>
                    </form>
                    <div id="snackbar">Valeu! Já já entraremos em contato.</div>
                    <div id="errorbar">Ocorreu um erro durante o envio, por favor tente novamente.</div>
                  </div>
                  
            </div>   
        );
    }
}

export default CadastroContent;