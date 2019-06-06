// Importando o React
import React, { Component } from 'react';
        
// Importando o Components
import Navbar from '../../components/navbar/navbar';       
import CadastroContent from './components/cadastro-content';       
import Footer from '../../components/footer/footer';      
// Importando css
import './cadastro-page.scss';


class Cadastro extends Component {
  render() {
    return (
      <div id="cadastro-container">
          <Navbar />
          <CadastroContent />
          <Footer />
      </div>   
    );
  }
}

export default Cadastro;