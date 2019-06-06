// Importando o React
import React, { Component } from 'react';
        
// Importando o components

// Importando os components necessários da lib react-materialize
import { Row, Col } from 'react-materialize';
//import { Link } from 'react-router-dom';
    
// Importando css
import './stylesheet/loja-content.scss';
// Importando img
import img from './img/minion-bob.jpg';
import img2 from './img/minion-kevin.jpg';
import img3 from './img/minion-stuart.jpg';
import img4 from './img/minion-doug.jpg';



class LojaContent extends Component {
    
    render() {
        return (
            <div id="loja-content">
                <h1>Vitrine</h1>
                <div className="lc-rect">
                    <Row>
                        <Col s={12} m={3}>
                            <div className="lc-box">
                                <h5>Minion Doug</h5>
                                <div className="lc-top-icons">
                                    <button title="carrinho"><i class="material-icons i-left">add_shopping_cart</i></button>
                                    <button title="favoritos"><i class="material-icons i-right">favorite_border</i></button>
                                </div>
                                <img src={img} title="" alt=""></img>
                                <div className="lc-bottom-icons">
                                    <div className="lc-price"><i class="material-icons i-left">attach_money</i> <p>25.90</p></div>
                                    <span class="badge">8 curtidas</span>
                                </div>
                            </div>
                        </Col>    
                        <Col s={12} m={3}>
                            <div className="lc-box">
                                <h5>Minion Kevin</h5>
                                <div className="lc-top-icons">
                                    <button title="carrinho"><i class="material-icons i-left">add_shopping_cart</i></button>
                                    <button title="favoritos"><i class="material-icons i-right">favorite_border</i></button>
                                </div>
                                <img src={img2} title="" alt=""></img>
                                <div className="lc-bottom-icons">
                                    <div className="lc-price"><i class="material-icons i-left">attach_money</i> <p>39.90</p></div>
                                    <span class="badge">5 curtidas</span>
                                </div>
                            </div>
                        </Col>    
                        <Col s={12} m={3}>
                            <div className="lc-box">
                                <h5>Minion Bob</h5>
                                <div className="lc-top-icons">
                                    <button title="carrinho"><i class="material-icons i-left">add_shopping_cart</i></button>
                                    <button title="favoritos"><i class="material-icons i-right">favorite_border</i></button>
                                </div>
                                <img src={img3} title="" alt=""></img>
                                <div className="lc-bottom-icons">
                                    <div className="lc-price"><i class="material-icons i-left">attach_money</i> <p>29.90</p></div>
                                    <span class="badge">4 curtidas</span>
                                </div>
                            </div>
                        </Col>   
                        <Col s={12} m={3}>
                            <div className="lc-box">
                                <h5>Minion Stuart</h5>
                                <div className="lc-top-icons">
                                    <button title="carrinho"><i class="material-icons i-left">add_shopping_cart</i></button>
                                    <button title="favoritos"><i class="material-icons i-right">favorite_border</i></button>
                                </div>
                                <img src={img4} title="" alt=""></img>
                                <div className="lc-bottom-icons">
                                    <div className="lc-price"><i class="material-icons i-left">attach_money</i> <p>19.90</p></div>
                                    <span class="badge">2 curtidas</span>
                                </div>
                            </div>    
                        </Col>  
                    </Row> 
                </div>    
            </div>   
        );
    }
}

export default LojaContent;