//importando cross-fetch
import fetch from 'cross-fetch';

//function para chamar endpoint que pega items do carrinho
export function getItemCarrinho(session_carrinho_id, callback) {
            
console.log('chamou get item carrinho!');            
//declarando constantes
//const api_url = 'http://localhost:3000/get_items_carrinho/' + session_carrinho_id;   
const api_url = "https://v6bkv4iee2.execute-api.us-east-1.amazonaws.com/dev/get_items_carrinho/" + session_carrinho_id;

//fetch api 
fetch(api_url)
.then(response => response.json()) // retorna uma promise
.then(result => {               
    if(result.success){
        console.log('dados de carrinho encontrados com sucesso!');
        callback(null, result.carrinho.items_list);
        return result.carrinho.items_list;
    }else{
        console.log('desculpe ocorreu um erro, tente novamente mais tarde!');
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
