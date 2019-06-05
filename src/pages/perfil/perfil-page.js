// Importando o React
import React, { Component } from 'react';
        
// Importando o Components
import Navbar from '../../components/navbar/navbar';       
import PerfilContent from './components/perfil-content';       
import Footer from '../../components/footer/footer';      
// Importando css
import './perfil-page.scss';


class Perfil extends Component {
  render() {
    return (
      <div id="perfil-container">
          <Navbar />
          <PerfilContent />
          <Footer />
      </div>   
    );
  }
}

export default Perfil;