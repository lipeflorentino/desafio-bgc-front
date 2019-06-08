// Importando o React
import React, { Component } from 'react';
        
// Importando o components
import fetch from 'cross-fetch';
// Importando os components necessários da lib react-materialize
import { Row, Col } from 'react-materialize';
//import { Link } from 'react-router-dom';
    
// Importando css
import './stylesheet/loja-content.scss';
// Importando img
import img from './img/minion-bob.jpg';

//const api = "https://t9wyd7u0o1.execute-api.us-east-1.amazonaws.com/dev/minions/";
const api = "http://localhost:3000/minions/";


class LojaContent extends Component {
    
    //constructor
    constructor(props) {
        super(props);

        this.state = {
            minions: [],
            isLoading: false,
            error: null,
        };
    }
    
    //setando estado carregando e chamando function para pegar dados da api
    componentDidMount() {        
        this.setState({ isLoading: true });  
        this.loadData();
    }
    
    loadData = () => {
        console.log("Loading Data...");
        fetch(api)
          .then(response => {
            if (response) {
              return response.json();
            } else {
              throw new Error('Something went wrong ...');
            }
          })
          .then(data => this.setState({ minions: data.minions, isLoading: false  }))
          .catch(error => this.setState({ error, isLoading: false }));
    }
    
    render() {
        
        const { minions, isLoading, error } = this.state;
        
        if (error) {
          return <p>{error.message}</p>;
        }
        
        if (isLoading) {
            //icone de loading...
            return <div className="loader"></div>;
        }
        
        return (
            <div id="loja-content">
                <h1>Vitrine</h1>
                <div className="lc-rect">
                    <Row>
                        {
                            minions.map((n, key) =>
                                
                                <Col s={12} m={3} key={key}>
                                    <div className="lc-box">
                                        <h5>{n.nome}</h5>
                                        <div className="lc-top-icons">
                                            <button title="carrinho"><i className="material-icons i-left">add_shopping_cart</i></button>
                                            <button title="favoritos"><i className="material-icons i-right">favorite_border</i></button>
                                        </div>
                                        <img src={img} title="" alt=""></img>
                                        <div className="lc-bottom-icons">
                                            <div className="lc-price"><i className="material-icons i-left">attach_money</i> <p>{n.preco}</p></div>
                                            <span className="badge">{n.qtd} curtidas</span>
                                        </div>
                                    </div>
                                </Col>    
                            )
                        }
                    </Row> 
                </div>    
            </div>   
        );
    }
}

export default LojaContent;