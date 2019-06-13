import fetch from 'cross-fetch';
//const api_url = 'http://localhost:3000/vendas/sendmail';     
const api_url = "https://v6bkv4iee2.execute-api.us-east-1.amazonaws.com/dev/vendas/sendmail";

export function enviarEmail(form) {
    console.log('chamou enviarEmail pelo react...');
    fetch(api_url, { 
        method: 'post', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    })
      .then(response => response.json()) // retorna uma promise
      .then(result => {
          if(result.success === true){
            return result.success;
          }else{
            console.error('Failed retrieving information', JSON.stringify(result));  
            return result.success;
          }
      })
      .catch(err => {
      // trata se alguma das promises falhar
      console.error('Failed retrieving information', err);
    });
}