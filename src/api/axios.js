import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  'https://ecommerce-backend-danqxn8xe-wael-alys-projects.vercel.app'
});

export default axiosInstance;
