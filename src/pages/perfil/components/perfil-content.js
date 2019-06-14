// Importando o React
import React, { Component } from 'react';
        
// Importando o components
import fetch from 'cross-fetch';
// Importando os components necessários da lib react-materialize
import { Row, Col } from 'react-materialize';
//import { Link } from 'react-router-dom';
    
// Importando css
import './stylesheet/perfil-content.scss';
// Importando img
import img from './img/user.png';
// localstorage
var localStorage = require('localStorage');
console.log('userId: ' + localStorage.getItem('session_user_id'));


class PerfilContent extends Component {
    
    //constructor
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            venda: [],
            isLoading: false,
            error: null,
        };
    }
    
    //setando estado carregando e chamando function para pegar dados da api
    componentDidMount() {        
        this.setState({ isLoading: true });  
        this.loadData();
        this.getVendas();
    }
    
    loadData = () => {
        console.log('entrei aqui!');
        console.log('session_userId: ' + localStorage.getItem('session_user_id'));
        //const api = "http://localhost:3000/users/" + localStorage.getItem('session_user_id');
        const api = "https://v6bkv4iee2.execute-api.us-east-1.amazonaws.com/dev/users/" + localStorage.getItem('session_user_id');
        fetch(api)
          .then(response => {
            if (response) {
              return response.json();
            } else {
              throw new Error('Something went wrong ...');
            }
          })
          .then(data => this.setState({ user: data, isLoading: false  }))
          .catch(error => this.setState({ error, isLoading: false }));
    }
    
    getVendas = () => {
        console.log('userId: ' + localStorage.getItem('session_user_id'));
        //const api_vendas = "http://localhost:3000/vendas/" + localStorage.getItem('session_user_id');
        const api_vendas = "https://v6bkv4iee2.execute-api.us-east-1.amazonaws.com/dev/vendas/" + localStorage.getItem('session_user_id');
        fetch(api_vendas)
          .then(response => {
            if (response) {
              return response.json();
            } else {
              throw new Error('Something went wrong ...');
            }
          })
          .then(data => this.setState({ venda: data, isLoading: false  }))
          .catch(error => this.setState({ error, isLoading: false }));
    }
    
    render() {
        const { user, venda, isLoading, error } = this.state;
        console.log('res: ' + JSON.stringify(venda));
        if (error) {
          return <p>{error.message}</p>;
        }
        
        if (isLoading) {
            //icone de loading...
            return <div className="loader-container"><div className="loader"></div></div>;
        }
        
        return (
            <div id="perfil-content">
                <Row>
                    <Col s={12} m={12}>
                        <div className="pc-infos">
                            <img src={img} title="" alt=""></img>
                            <div className="pc-infos-text">
                                <p><strong>Nome:</strong></p>
                                <p>{user.nome}</p>
                                <p><strong>Email:</strong></p> 
                                <p>{user.userId}</p>
                            </div>
                        </div>
                    </Col> 
                    {venda.success===false &&
                     <Row>
                        <Col s={12} m={12}>
                            <div className="pc-tables">
                                <h1>Registros</h1>
                                <p><strong>Não há resgistros de vendas.</strong></p>
                            </div>
                        </Col>            
                    </Row>   
                    }
                    {venda.success===true &&
                    <Col s={12} m={12}>
                        <div className="pc-tables">
                            <h1>Registros</h1>
                            <table className="highlight responsive-table">
                                <thead>
                                  <tr>
                                      <th>Data</th>
                                      <th>Qtd</th>
                                      <th>Items</th>
                                      <th>Valor Total</th>
                                  </tr>
                                </thead>
                        
                                <tbody>
                                    {
                                        venda.vendas.map((n, key) =>
                                          <tr key={key}>
                                            <td>{n.data_venda}</td>
                                            <td>{n.qtd_items}</td>
                                            <td>{n.nome_items}</td>
                                            <td>R$ {n.valor_total}</td>
                                          </tr>
                                        )  
                                    }
                                </tbody>
                              </table>    
                        </div>
                    </Col>    
                    }
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