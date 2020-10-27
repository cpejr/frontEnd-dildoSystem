import axios from 'axios';

const api = axios.create({
    //Sempre que for gerar uma build alterar este endereço para http://157.230.57.125:3333
    baseURL: 'http://localhost:3333',
})

export default api;