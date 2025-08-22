import axios from 'axios';

const api = axios.create({
  baseURL: 'https://s61-rehman-capstone-amaraz.onrender.com/user', 
});

export default api;
