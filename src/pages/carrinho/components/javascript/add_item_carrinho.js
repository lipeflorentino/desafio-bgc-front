//importando cross-fetch
import fetch from 'cross-fetch';

//function para chamar endpoint que adc item no carrinho
export function addItemCarrinho(item, carrinhoId, callback) {
            
console.log('chamou add item carrinho!');            
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
        console.log('adicionei 1 item ao carrinho!');
        callback(null, result.success);
        return result.success;
        
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
