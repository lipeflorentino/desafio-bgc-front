// Importando o React
import React, { Component } from 'react';
        
// Importando o components
import fetch from 'cross-fetch';
// Importando os components necessários da lib react-materialize
import { Row, Col } from 'react-materialize';
//import { Link } from 'react-router-dom';
    
// Importando css
import './stylesheet/carrinho-content.scss';
// Importando img
import img from './img/minion-bob.jpg';

//importando funcao para registrar venda
import { registraVenda } from './javascript/registra_venda.js';

// Implementar session carrinho id
const session_carrinho_id = "25516a50-8937-11e9-96ae-c3f4ee135e82";
const session_user_email = "wayne@batmail.com";
//const api = "https://t9wyd7u0o1.execute-api.us-east-1.amazonaws.com/dev/carrino/";
const api = "http://localhost:3000/get_items_carrinho/" + session_carrinho_id;


class CarrinhoContent extends Component {
    
    //constructor
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoading: false,
            error: null,
        };
        this.handleClick = this.handleClick.bind(this);
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
          .then(data => this.setState({ items: data, isLoading: false  }))
          .catch(error => this.setState({ error, isLoading: false }));
    }
    
    //function para chamar a funcao de registro de venda 
    handleClick(param, e) {
        registraVenda(param, session_user_email);
    }
    
    render() {
        
        const { items, isLoading, error } = this.state;
        
        if (error) {
          return <p>{error.message}</p>;
        }
        
        if (isLoading) {
            //icone de loading...
            return <div className="loader"></div>;
        }
        
        return (
            <div id="carrinho-content">
                <h1>Carrinho</h1>
                <div className="cc-rect">
                    <Row>
                        {
                            items.map((n, key) =>
                                <Col s={12} m={3} key={key}>
                                    <div className="cc-box">
                                        <h5>{n.nome}</h5>
                                        <div className="cc-top-icons">
                                            <button title="carrinho"><i className="material-icons i-left">delete</i></button>
                                            <button title="favoritos"><i className="material-icons i-right">favorite_border</i></button>
                                        </div>
                                        <img src={img} title="" alt=""></img>
                                        <div className="cc-bottom-icons">
                                            <div className="cc-price"><i className="material-icons i-left">attach_money</i> <p>{n.preco}</p></div>
                                            <span className="badge">{n.qtd} curtidas</span>
                                        </div>
                                    </div>
                                </Col>   
                            )
                        } 
                    </Row> 
                </div> 
                <button onClick={this.handleClick.bind(this, items)} className="btn waves-effect waves-light" type="submit" name="action">
                    Realizar Pedido
                    <i className="material-icons right">send</i>
                </button>
            </div>   
        );
    }
}

export default CarrinhoContent;