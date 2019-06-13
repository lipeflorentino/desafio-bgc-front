//importando cross-fetch
import fetch from 'cross-fetch';

//function para chamar endpoint que cria um carrinho
export function removeCarrinhoVazio(carrinhoId, callback) {
            
console.log('chamou remove carrinho!');            
//declarando constantes
//const api_url = 'http://localhost:3000/carrinho/' + carrinhoId;     
const api_url = "https://t9wyd7u0o1.execute-api.us-east-1.amazonaws.com/dev/carrinho/" + carrinhoId;

//fetch api 
fetch(api_url, { 
    method: 'delete', 
    headers: {
        "Content-Type": "application/json", 
    },
})
.then(response => response.json()) // retorna uma promise
.then(result => {               
    if(result.success){
        console.log('removi o carrinho!');
        callback(null, result);
        return result;
        
    }else{
        callback(result.error, null);
        return result.success;
    }
    //document.getElementById("").innerHTML = qtd;
})
.catch(err => {
    // trata se alguma das promises falhar
    console.error('Failed retrieving information', err);
});


}
