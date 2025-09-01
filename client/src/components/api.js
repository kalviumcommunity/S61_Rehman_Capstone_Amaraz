import axios from 'axios';

const api = axios.create({
  baseURL: 'https://s61-rehman-capstone-amaraz.onrender.com',
  withCredentials: true,
});

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;
