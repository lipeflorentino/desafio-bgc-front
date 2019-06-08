import fetch from 'cross-fetch';
//function para chamar endpoint que registra venda
export function registraVenda(list, e) {
            
const api_url = 'http://localhost:3000/vendas';      

console.log('chamou registra venda!');
var valor_total = 0;
const qtd_items = list.length;
const data_venda = new Date(Date.now());
var nome_items = '';

var i;
for (i = 0; i < list.length; ++i) {
    valor_total = valor_total + Number(list[i].preco);
    nome_items = nome_items + list[i].nome;
    if(i+1<list.length){
        nome_items = nome_items + ', ';
    }
}

const email = e;

console.log('email: ' + email);
console.log('data venda: ' + data_venda);
console.log('qtd_items: ' + qtd_items);
console.log('items: ' + nome_items);
console.log('valor total: ' + valor_total);

const form = {'email': email, 'data_venda': data_venda, 'qtd_items': qtd_items, 'nome_items': nome_items, 'valor_total': valor_total};

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
        alert('Seu pedido foi registrado, em instantes você receberá um e-mail de confirmação.');
        
    }else{
        console.log('erro!');
    }
    //document.getElementById("").innerHTML = qtd;
})
.catch(err => {
    // trata se alguma das promises falhar
    console.error('Failed retrieving information', err);
});


}
