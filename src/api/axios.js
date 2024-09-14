import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  'https://ecommerce-backend-ezrgna25r-wael-alys-projects.vercel.app'
});

export default axiosInstance;
