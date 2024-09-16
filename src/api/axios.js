import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  'https://ecommerce-backend-b85krociz-wael-alys-projects.vercel.app'
});

export default axiosInstance;
