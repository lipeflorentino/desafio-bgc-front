//importando cross-fetch
import fetch from 'cross-fetch';

//function para chamar endpoint que cria um carrinho
export function criaCarrinho(userId, callback) {
    
console.log('chamou cria carrinho!');            
//declarando constantes
//const api_url = 'http://localhost:3000/carrinho/';    
const api_url = "https://v6bkv4iee2.execute-api.us-east-1.amazonaws.com/dev/carrinho/";
const list = [];
const item = {"userId": userId, "items_list": list};
//fetch api 
fetch(api_url, { 
    method: 'post', 
    headers: {
        "Content-Type": "application/json", 
    },
    body: JSON.stringify(item)
})
.then(response => response.json()) // retorna uma promise
.then(result => {               
    if(result.success){
        console.log('criei um carrinho!');
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
