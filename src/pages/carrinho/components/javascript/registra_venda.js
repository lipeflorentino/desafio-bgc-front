//importando cross-fetch
import fetch from 'cross-fetch';
//importando funcao para envio de email
import { enviarEmail } from './enviar_email.js';
//importando funcao para fazer o checkout do carrinho
import { checkoutCarrinho } from './checkout_carrinho.js';
//function para chamar endpoint que registra venda
export function registraVenda(list, email, nome, carrinhoId, callback) {
            
console.log('chamou registra venda!');            
//declarando constantes
//const api_url = 'http://localhost:3000/vendas';     
const api_url = "https://t9wyd7u0o1.execute-api.us-east-1.amazonaws.com/dev/vendas/";
const qtd_items = list.length;
const data_venda = new Date(Date.now());
//declarando variaveis
var valor_total = 0;
var nome_items = '';
var i = 0;
console.log('list: ' + list);
//percorrendo a lista para setar valores
for (i; i < list.length; ++i) {
    valor_total = valor_total + Number(list[i].preco);
    nome_items = nome_items + list[i].nome;
    if(i+1<list.length){
        nome_items = nome_items + ', ';
    }
}

//setando dados para o body da requisicao
const form = {'email': email, 'nome': nome, 'data_venda': data_venda, 'qtd_items': qtd_items, 'nome_items': nome_items, 'valor_total': valor_total};
console.log('form: ' + JSON.stringify(form));
//fetch api 
fetch(api_url, { 
    method: 'post', 
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
})
.then(response => response.json()) // retorna uma promise
.then(result => {               
    if(result.success){
        console.log('adicionei 1 venda!');
        enviarEmail(form);
        alert('Seu pedido foi registrado, em instantes você receberá um e-mail de confirmação.');
        checkoutCarrinho(carrinhoId);
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
