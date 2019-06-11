// Importando o React
import React, { Component } from 'react';
        
// Importando o components
import fetch from 'cross-fetch';
import { Redirect } from 'react-router-dom';
import { addItemCarrinho } from '../../carrinho/components/javascript/add_item_carrinho.js';
import { getItemCarrinho } from '../../carrinho/components/javascript/get_item_carrinho.js';
import { criaCarrinho } from '../../carrinho/components/javascript/cria_carrinho.js';
// Importando os components necessários da lib react-materialize
import { Row, Col } from 'react-materialize';
//import { Link } from 'react-router-dom';
    
// Importando css
import './stylesheet/loja-content.scss';
// Importando img
import img from './img/minion-bob.jpg';

//local storage
var localStorage = require('localStorage');

console.log('qtd: ' + localStorage.getItem('session_qtd_items'));
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
        this.handleClick = this.handleClick.bind(this);
    }
    
    //setando estado carregando e chamando function para pegar dados da api
    componentDidMount() {        
        this.setState({ isLoading: true });  
        this.loadData();
    }
    
    state = {
        redirect: false
    }
    setRedirect = () => {
        this.setState({
          redirect: true
        });
    }
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/perfil' />;
        }
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
    
    //funcao para add item no carrinho
    handleClick(param, event) {
        
        //verifica se o carrinho não está vazio
        const session_carrinho_id = localStorage.getItem('session_carrinho_id');
        const session_qtd_items = localStorage.getItem('session_qtd_items');
        
        if(Number(session_qtd_items) > 0){
            console.log('carrinho com items!');
            //pega o carrinho e insere item
            getItemCarrinho(session_carrinho_id, function(err, result){
                if(err){
                    console.log('err: ' + err);
                }else{
                    //setando id do item
                    const itemId = String(session_carrinho_id + "-" + Number(result.length + 1));
                    //atualizando item com o itemId
                    var item = {"minionId": param.minionId,"preco":param.preco,"qtd":param.qtd,"nome":param.nome,"descricao":param.descricao, "itemId":itemId};
                    //inseridno item na lista de items
                    result.push(item);
                    //adicionando a lista no carrinho
                    addItemCarrinho(result, session_carrinho_id, function(err, res){
                        if(err){
                            console.log('err: ' + err);
                            alert('ocorreu um erro!');
                        }else{
                            const session_qtd_items = localStorage.getItem('session_qtd_items');
                            localStorage.setItem('session_qtd_items', Number(session_qtd_items) + 1);
                            alert('Produto adicionado ao carrinho com sucesso!');
                        }   
                    });    
                }
            });   
            
            
        }else{
            //criar carrinho e insere item
            console.log('carrinho vazio!');
            //criar um novo carrinho
            const session_user_id = localStorage.getItem('session_user_id');
            criaCarrinho(session_user_id, function(err, result){
                if(err){
                    console.log('err: ' + err);
                    alert('ocorreu um erro!');    
                }else{
                    console.log('carrinho criado com sucesso!');
                    console.log('res: ' + result)
                    //setando id do item
                    const itemId = String(result.data.carrinhoId + "-" + 0);
                    //atualizando item com o itemId
                    var item = [{"minionId": param.minionId,"preco":param.preco,"qtd":param.qtd,"nome":param.nome,"descricao":param.descricao, "itemId":itemId}];
                    //adicionando a lista no carrinho
                    addItemCarrinho(item, session_carrinho_id, function(err, res){
                        if(err){
                            console.log('err: ' + err);
                            alert('ocorreu um erro!');
                        }else{
                            alert('Produto adicionado ao carrinho com sucesso!');
                            const session_qtd_items = localStorage.getItem('session_qtd_items');
                            localStorage.setItem('session_qtd_items', Number(session_qtd_items) + 1);
                        }   
                    });
                }
            });
        }
        
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
                                        {this.renderRedirect()}
                                        <h5>{n.nome}</h5>
                                        <div className="lc-top-icons">
                                            <button onClick={this.handleClick.bind(this, n)} title="carrinho"><i className="material-icons i-left">add_shopping_cart</i></button>
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