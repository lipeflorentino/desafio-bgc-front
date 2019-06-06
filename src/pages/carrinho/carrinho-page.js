// Importando o React
import React, { Component } from 'react';
        
// Importando o Components
import Navbar from '../../components/navbar/navbar';       
import CarrinhoContent from './components/carrinho-content';       
import Footer from '../../components/footer/footer';      
// Importando css
import './carrinho-page.scss';


class Carrinho extends Component {
  render() {
    return (
      <div id="carrinho-container">
          <Navbar />
          <CarrinhoContent />
          <Footer />
      </div>   
    );
  }
}

export default Carrinho;