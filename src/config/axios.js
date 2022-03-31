import axios from 'axios';



const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_URL_BACKEND}`,
    
})


export default clienteAxios;