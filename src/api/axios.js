import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  'https://ecommerce-backend-k0g6fh9lw-wael-alys-projects.vercel.app'
});

export default axiosInstance;
