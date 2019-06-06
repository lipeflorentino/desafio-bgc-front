// Importando o React
import React, { Component } from 'react';
        
// Importando o components

// Importando os components necessários da lib react-materialize
import { Row, Col } from 'react-materialize';
//import { Link } from 'react-router-dom';
    
// Importando css
import './stylesheet/carrinho-content.scss';
// Importando img
import img from './img/minion-bob.jpg';
import img2 from './img/minion-kevin.jpg';


class CarrinhoContent extends Component {
    
    render() {
        return (
            <div id="carrinho-content">
                <h1>Carrinho</h1>
                <div className="cc-rect">
                    <Row>
                        <Col s={12} m={3}>
                            <div className="cc-box">
                                <h5>Minion Doug</h5>
                                <div className="cc-top-icons">
                                    <button title="carrinho"><i class="material-icons i-left">delete</i></button>
                                    <button title="favoritos"><i class="material-icons i-right">favorite_border</i></button>
                                </div>
                                <img src={img} title="" alt=""></img>
                                <div className="cc-bottom-icons">
                                    <div className="cc-price"><i class="material-icons i-left">attach_money</i> <p>25.90</p></div>
                                    <span class="badge">8 curtidas</span>
                                </div>
                            </div>
                        </Col>    
                        <Col s={12} m={3}>
                            <div className="cc-box">
                                <h5>Minion Kevin</h5>
                                <div className="cc-top-icons">
                                    <button title="carrinho"><i class="material-icons i-left">delete</i></button>
                                    <button title="favoritos"><i class="material-icons i-right">favorite_border</i></button>
                                </div>
                                <img src={img2} title="" alt=""></img>
                                <div className="cc-bottom-icons">
                                    <div className="lc-price"><i class="material-icons i-left">attach_money</i> <p>39.90</p></div>
                                    <span class="badge">5 curtidas</span>
                                </div>
                            </div>
                        </Col>    
                    </Row> 
                </div> 
                <button class="btn waves-effect waves-light" type="submit" name="action">
                    Realizar Pedido
                    <i class="material-icons right">send</i>
                </button>
            </div>   
        );
    }
}

export default CarrinhoContent;