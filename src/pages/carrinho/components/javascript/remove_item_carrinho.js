//importando cross-fetch
import fetch from 'cross-fetch';

//function para chamar endpoint que remove item do carrinho
export function removeItemCarrinho(item, carrinhoId, callback) {
            
console.log('chamou remove item carrinho!');            
//declarando constantes
//const api_url = 'http://localhost:3000/add_item_to_carrinho/' + carrinhoId;      
const api_url = "https://v6bkv4iee2.execute-api.us-east-1.amazonaws.com/dev/add_item_to_carrinho/" + carrinhoId;

//fetch api 
fetch(api_url, { 
    method: 'put', 
    headers: {
        "Content-Type": "application/json", 
    },
    body: JSON.stringify(item)
})
.then(response => response.json()) // retorna uma promise
.then(result => {               
    if(result.success){
        console.log('removi 1 item do carrinho!');
        callback(null, result.success);
        return result.success;
        
    }else{
        alert('desculpe ocorreu um erro, tente novamente mais tarde!');
        return result.success;
    }
    //document.getElementById("").innerHTML = qtd;
})
.catch(err => {
    // trata se alguma das promises falhar
    console.error('Failed retrieving information', err);
});


}
