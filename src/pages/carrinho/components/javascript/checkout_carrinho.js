//importando cross-fetch
import fetch from 'cross-fetch';

//function para chamar endpoint que remove um carrinho por id
export function checkoutCarrinho(carrinhoId) {
    
    console.log('chamou o checkout carrinho!');    
    //declarando constantes
    //const api_url = 'http://localhost:3000/carrinho/'+ carrinhoId;   
    const api_url = "https://v6bkv4iee2.execute-api.us-east-1.amazonaws.com/dev/carrinho/" + carrinhoId;
    //fetch api 
    fetch(api_url, { 
        method: 'delete', 
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json()) // retorna uma promise
    .then(result => {               
        if(result.success){
            console.log('checkout do carrinho efetuado com sucesso!');
        }else{
            console.log('desculpe ocorreu um erro dutante o checkout, tente novamente mais tarde!');
        }
    })
    .catch(err => {
        // trata se alguma das promises falhar
        console.error('Failed retrieving information', err);
    });

}