import axios from 'axios';

const api = axios.create({
    //Sempre que for gerar uma build para produção, alterar este endereço para https://backend.lojacasulus.com.br
    baseURL: 'http://localhost:3333',
})

export default api;