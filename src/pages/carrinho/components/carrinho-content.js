// Importando o React
import React, { Component } from 'react';
        
// Importando o components
import $ from 'jquery';
import fetch from 'cross-fetch';
import { Redirect } from 'react-router-dom';
import { removeItemCarrinho } from './javascript/remove_item_carrinho.js';
import { getItemCarrinho } from './javascript/get_item_carrinho.js';
import { removeCarrinhoVazio } from './javascript/remove_carrinho_vazio.js';
// Importando os components necessários da lib react-materialize
import { Row, Col } from 'react-materialize';
//import { Link } from 'react-router-dom';
    
// Importando css
import './stylesheet/carrinho-content.scss';
import '../../../components/snackbar/stylesheet/snackbar.scss';
// Importando img
import img from './img/minion-bob.jpg';

//importando funcao para registrar venda
import { registraVenda } from './javascript/registra_venda.js';

//local storage
var localStorage = require('localStorage');
//pegando dados do localStorage
const session_carrinho_id = localStorage.getItem('session_carrinho_id');
const session_user_email = localStorage.getItem('session_user_id');
const session_user_name = localStorage.getItem('session_user_name');
const api = "https://v6bkv4iee2.execute-api.us-east-1.amazonaws.com/dev/carrinho/" + session_carrinho_id;
//const api = "http://localhost:3000/get_items_carrinho/" + session_carrinho_id;


class CarrinhoContent extends Component {
    
    //constructor
    constructor(props) {
        super(props);

        this.state = {
            dados: {},
            isLoading: false,
            error: null,
            redirect: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        
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
          return <Redirect to='/carrinho' />;
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
          .then(data => this.setState({ dados: data, isLoading: false  }))
          .catch(error => this.setState({ error, isLoading: false }));
    }
    
    //function para chamar a funcao de registro de venda 
    handleClick(param, e) {
        registraVenda(param, session_user_email, session_user_name, session_carrinho_id, function(err, res){
            if(err){
                console.log('err: ' + err);
                console.log('err: ' + err);
                // Get the snackbar DIV
                var x = document.getElementById("errorbar");
                // Add the "show" class to DIV
                x.className = "show";
                // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            }else{
                localStorage.setItem('session_qtd_items', 0);
                // Get the snackbar DIV
                var y = document.getElementById("snackbar");
                // Add the "show" class to DIV
                y.className = "show";
                // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ y.className = y.className.replace("show", ""); }, 3000);
                setTimeout(function(){ window.location = '/carrinho'; }, 3200);
            }   
        });
        
    }
    
    //function para remover um item do carrinho
    deleteClick(param, e){
        
        const session_carrinho_id = localStorage.getItem('session_carrinho_id');
        //pega o carrinho e remove item
        getItemCarrinho(session_carrinho_id, function(err, result){
            if(err){
                console.log('err: ' + err);
            }else{
                var i;
                for (i=0; i<result.length; i++){
                    //verifica qual elemento será removido
                    if(result[i].itemId === param.itemId){
                        //gera uma nova lista sem o item que foi removido
                        result.splice(i, 1);
                    }
                }
                
                removeItemCarrinho(result, session_carrinho_id, function(err, res){
                    if(err){
                        console.log('err: ' + err);
                        console.log('err: ' + err);
                        // Get the snackbar DIV
                        var x = document.getElementById("errorbar");
                        // Add the "show" class to DIV
                        x.className = "show";
                        // After 3 seconds, remove the show class from DIV
                        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    }else{
                        const id = param.itemId;
                        //esconde o elemento da tela
                        $('#'+id).addClass('hide');
                        //atualiza o qtd session qtd items
                        const session_qtd_items = localStorage.getItem('session_qtd_items');
                        localStorage.setItem('session_qtd_items', Number(session_qtd_items) - 1);
                        $('#qtd_items').text(localStorage.getItem('session_qtd_items'));
                        $('#qtd_items').addClass('qtd_items_animation');
                        // Get the snackbar DIV
                        var y = document.getElementById("snackbar");
                        // Add the "show" class to DIV
                        y.className = "show";
                        // After 3 seconds, remove the show class from DIV
                        setTimeout(function(){ y.className = y.className.replace("show", ""); }, 3000);
                        //se o carrinho ficar vazio, remove o carrinho vazio
                        if(Number(localStorage.getItem('session_qtd_items')) === 0){
                            removeCarrinhoVazio(session_carrinho_id, function(err, result){
                                if(err){
                                    console.log('erro ao tentar remover carrinho!');
                                    setTimeout(function(){ window.location = '/carrinho'; }, 3200);
                                }else{
                                    console.log('carrinho vazio removido com sucesso!');
                                    setTimeout(function(){ window.location = '/carrinho'; }, 3200);
                                }
                            });
                            
                        }
                    }   
                });
            }
        });
    }
    
    render() {
        
        const { dados, isLoading, error } = this.state;
        
        if(dados.carrinho !== undefined){
            var list = dados.carrinho.items_list;
        }
        
        if (error) {
          return <p>{error.message}</p>;
        }
        
        if (isLoading) {
            //icone de loading...
            return <div className="loader"></div>;
        }
        
        if(dados.success===false){
            return (
                
                <div id="carrinho-content">
                    <h1>Carrinho</h1>
                    <p className="p-vazio">Não há items no carrinho</p>
                </div>    
            );
        }else{
            if(list){
                return (
                    
                    <div id="carrinho-content">
                        <h1>Carrinho</h1>
                        <div className="cc-rect">
                            {this.renderRedirect()}
                            <Row>
                                {
                                    list.map((n, key) =>
                                        <Col s={12} m={3} key={key} id={n.itemId}>
                                            <div className="cc-box">
                                                <h5>{n.nome}</h5>
                                                <div className="cc-top-icons">
                                                    <button onClick={this.deleteClick.bind(this, n)} title="carrinho"><i className="material-icons i-left">delete</i></button>
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
                        <button onClick={this.handleClick.bind(this, list)} className="btn waves-effect waves-light" type="submit" name="action">
                            Realizar Pedido
                            <i className="material-icons right">send</i>
                        </button>
                        <div id="snackbar">Atualizado com sucesso!</div>
                        <div id="errorbar">Ops! Ocorreu um erro.</div>
                    </div>   
                );
            }else{
                return (
                    
                    <div id="carrinho-content">
                        <h1>Carrinho</h1>
                        <p className="p-vazio">Não há items no carrinho</p>
                    </div>
                );
            }    
        }
    }
}

export default CarrinhoContent;