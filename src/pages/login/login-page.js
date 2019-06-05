// Importando o React
import React, { Component } from 'react';
        
// Importando o Components
import Navbar from '../../components/navbar/navbar';       
import LoginContent from './components/login-content';       
import Footer from '../../components/footer/footer';      
// Importando css
import './login-page.scss';


class Login extends Component {
  render() {
    return (
      <div id="login-container">
          <Navbar />
          <LoginContent />
          <Footer />
      </div>   
    );
  }
}

export default Login;