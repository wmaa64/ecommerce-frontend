import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  'https://ecommerce-backend-3zn2fmzmc-wael-alys-projects.vercel.app'
});

export default axiosInstance;
