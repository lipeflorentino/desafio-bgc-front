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
                <h1>Loja Minion</h1>
                <div className="lc-rect">
                    <Row>
                        <Col s={12} m={3}>
                            <div className="lc-box">
                                <div className="lc-top-icons">
                                    <i class="material-icons i-left">add</i>
                                    <i class="material-icons i-right">favorite_border</i>
                                </div>
                                <img src={img} title="" alt=""></img>
                            </div>
                        </Col>    
                        <Col s={12} m={3}>
                            <div className="lc-box">
                                <div className="lc-top-icons">
                                    <i class="material-icons i-left">add</i>
                                    <i class="material-icons i-right">favorite_border</i>
                                </div>
                                <img src={img2} title="" alt=""></img>
                            </div>
                        </Col>    
                        <Col s={12} m={3}>
                            <div className="lc-box">
                                <div className="lc-top-icons">
                                    <i class="material-icons i-left">add</i>
                                    <i class="material-icons i-right">favorite_border</i>
                                </div>
                                <img src={img3} title="" alt=""></img>
                            </div>
                        </Col>   
                        <Col s={12} m={3}>
                            <div className="lc-box">
                                <div className="lc-top-icons">
                                    <a><i class="material-icons i-left">add</i></a>
                                    <a><i class="material-icons i-right">favorite_border</i></a>
                                </div>
                                <img src={img4} title="" alt=""></img>
                            </div>    
                        </Col>  
                    </Row> 
                </div>    
            </div>   
        );
    }
}

export default LojaContent;