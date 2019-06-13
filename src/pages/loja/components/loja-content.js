// Importando o React
import React, { Component } from 'react';
        
// Importando o components
import $ from 'jquery';
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
import '../../../components/snackbar/stylesheet/snackbar.scss';
// Importando img
import img from './img/minion-bob.jpg';

//local storage
var localStorage = require('localStorage');

const api = "https://v6bkv4iee2.execute-api.us-east-1.amazonaws.com/dev/minions/";
//const api = "http://localhost:3000/minions/";

class LojaContent extends Component {
    
    
    //constructor
    constructor(props) {
        super(props);

        this.state = {
            minions: [],
            isLoading: false,
            error: null,
        };
        this.addClick = this.addClick.bind(this);
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
          return <Redirect to='/loja' />;
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
    addClick(param, event) {
        
        //verifica se o carrinho não está vazio
        const session_carrinho_id = localStorage.getItem('session_carrinho_id');
        const session_qtd_items = localStorage.getItem('session_qtd_items');
        
        if(Number(session_qtd_items) > 0 && session_carrinho_id !== ''){
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
                            // Get the snackbar DIV
                            var x = document.getElementById("errorbar");
                            // Add the "show" class to DIV
                            x.className = "show";
                            // After 3 seconds, remove the show class from DIV
                            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                        }else{
                            const session_qtd_items = localStorage.getItem('session_qtd_items');
                            localStorage.setItem('session_qtd_items', Number(session_qtd_items) + 1);
                            $('#qtd_items').text(localStorage.getItem('session_qtd_items'));
                            $('#qtd_items').addClass('qtd_items_animation');
                            // Get the snackbar DIV
                            var y = document.getElementById("snackbar");
                            // Add the "show" class to DIV
                            y.className = "show";
                            // After 3 seconds, remove the show class from DIV
                            setTimeout(function(){ y.className = y.className.replace("show", ""); }, 3000);
                            setTimeout(function(){ window.location.reload(); }, 3200);
                            
                        }   
                    });    
                }
            });   
            
            
        }else{
            if(localStorage.getItem('session_user_id') && localStorage.getItem('session_user_id')!==''){
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
                        //setando id do item
                        const itemId = String(result.data.carrinhoId + "-" + 1);
                        //atualizando item com o itemId
                        var item = [{"minionId": param.minionId,"preco":param.preco,"qtd":param.qtd,"nome":param.nome,"descricao":param.descricao, "itemId":itemId}];
                        //atualizando session carrinho id
                        localStorage.setItem('session_carrinho_id', result.data.carrinhoId);
                        const session_carrinho_id = localStorage.getItem('session_carrinho_id');
                        
                        //adicionando a lista no carrinho
                        addItemCarrinho(item, session_carrinho_id, function(err, res){
                            if(err){
                                console.log('err: ' + err);
                                // Get the snackbar DIV
                                var x = document.getElementById("errorbar");
                                // Add the "show" class to DIV
                                x.className = "show";
                                // After 3 seconds, remove the show class from DIV
                                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                            }else{
                                //atualizando a session qtd items
                                const session_qtd_items = localStorage.getItem('session_qtd_items');
                                localStorage.setItem('session_qtd_items', Number(session_qtd_items) + 1);
                                $('#qtd_items').text(localStorage.getItem('session_qtd_items'));
                                $('#qtd_items').addClass('qtd_items_animation');
                                // Get the snackbar DIV
                                var y = document.getElementById("snackbar");
                                // Add the "show" class to DIV
                                y.className = "show";
                                // After 3 seconds, remove the show class from DIV
                                setTimeout(function(){ y.className = y.className.replace("show", ""); }, 3000);
                                setTimeout(function(){ window.location.reload(); }, 3200);
                            }   
                        });
                    }
                });
            }    
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
                                            <button onClick={this.addClick.bind(this, n)} title="carrinho"><i className="material-icons i-left">add_shopping_cart</i></button>
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
                <div id="snackbar">Atualizado com sucesso!</div>
                <div id="errorbar">Ops! Ocorreu um erro.</div>
            </div>   
            
        );
    }
}

export default LojaContent;