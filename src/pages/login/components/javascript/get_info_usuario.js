import fetch from 'cross-fetch';

export function getInfoUsuario(userId, callback) {
    const api_url = 'http://localhost:3000/users/'+ userId;   
    //fetch api 
    fetch(api_url)
    .then(response => response.json()) // retorna uma promise
    .then(result => {               
        if(result.success){
            console.log('get user efetuado com sucesso!');
            callback(null, result);
            return result;
        }else{
            console.log('desculpe ocorreu um erro dutante a busca, tente novamente mais tarde!');
            callback(result.error, result);
            return result.success;
        }
    })
    .catch(err => {
        // trata se alguma das promises falhar
        console.error('Failed retrieving information', err);
    });
}    