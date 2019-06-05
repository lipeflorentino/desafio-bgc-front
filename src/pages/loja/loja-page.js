// Importando o React
import React, { Component } from 'react';
        
// Importando o Components
import Navbar from '../../components/navbar/navbar';       
import LojaContent from './components/loja-content';       
import Footer from '../../components/footer/footer';      
// Importando css
import './loja-page.scss';


class Loja extends Component {
  render() {
    return (
      <div id="loja-container">
          <Navbar />
          <LojaContent />
          <Footer />
      </div>   
    );
  }
}

export default Loja;