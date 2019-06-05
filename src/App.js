// Importando o React
import React, { Component } from 'react';
// Importando os components necessários da lib react-materialize
//import { Row, Col } from 'react-materialize';
        
// Importando o components
import { Link } from 'react-router-dom';
// Importando img
import img from './img/minions.png';
// Importando css
import './app.scss';


class App extends Component {
  render() {
    return (
      <div id="app-container">
          <header className="app-header">
            <h1>Minion<yellow>Store</yellow></h1>
            <img src={img} className="app-logo" alt="logo"></img>
            <p>A sua loja oficial de minions!</p>
            <Link className="waves-effect waves-light btn" to="/login">Login</Link>
            <p className="p-cadastro">ainda não tem conta? faça um <Link to="/cadastro">cadastro</Link></p>
          </header>
      </div>
    );
  }
}

export default App;