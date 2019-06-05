// Importando o React
import React, { Component } from 'react';
        
// Importando o components

// Importando os components necessários da lib react-materialize
import { Row, Col } from 'react-materialize';
//import { Link } from 'react-router-dom';
    
// Importando css
import './stylesheet/perfil-content.scss';
// Importando img
import img from './img/user.png';


class PerfilContent extends Component {
    
    render() {
        return (
            <div id="perfil-content">
                <Row>
                    <Col s={12} m={12}>
                        <div className="pc-infos">
                            <img src={img} title="" alt=""></img>
                            <div className="pc-infos-text">
                                <p><strong>Nome:</strong></p>
                                <p>Fulano da Silva</p>
                                <p><strong>Email:</strong></p> 
                                <p>fulano@gmail.com</p>
                            </div>
                        </div>
                    </Col>    
                    <Col s={12} m={12}>
                        <div className="pc-tables">
                            <h1>Registros</h1>
                            <table class="highlight responsive-table">
                                <thead>
                                  <tr>
                                      <th>Data</th>
                                      <th>Qtd</th>
                                      <th>Items</th>
                                      <th>Valor Total</th>
                                  </tr>
                                </thead>
                        
                                <tbody>
                                  <tr>
                                    <td>10/01/2019</td>
                                    <td>2</td>
                                    <td>Minion Bob, Minion Stuart</td>
                                    <td>$49.87</td>
                                  </tr>
                                  <tr>
                                    <td>30/04/2019</td>
                                    <td>2</td>
                                    <td>Minion Alex, Minion Stuart</td>
                                    <td>$30.90</td>
                                  </tr>
                                  <tr>
                                    <td>12/05/2019</td>
                                    <td>4</td>
                                    <td>Minion Frank, Minion Stuart, Minion Bob, Minion Stuart</td>
                                    <td>$69.90</td>
                                  </tr>
                                </tbody>
                              </table>    
                        </div>
                    </Col>    
                    <Col s={12} m={12}>
                        <div className="pc-favoritos">
                            
                        </div>
                    </Col>    
                </Row>    
            </div>   
        );
    }
}

export default PerfilContent;