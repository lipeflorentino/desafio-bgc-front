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

//implementar getUserId da session
const session_user_id = "aoiwjdq928";
//const api = "https://t9wyd7u0o1.execute-api.us-east-1.amazonaws.com/dev/users/" + session_user_id;
const api = "http://localhost:3000/users/" + session_user_id;

class PerfilContent extends Component {
    
    //constructor
    constructor(props) {
        super(props);

        this.state = {
            user: {},
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
          .then(data => this.setState({ user: data, isLoading: false  }))
          .catch(error => this.setState({ error, isLoading: false }));
    }
    
    render() {
        const { user, isLoading, error } = this.state;
        
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
                                <p>{user.email}</p>
                            </div>
                        </div>
                    </Col> 
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