import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://localhost:5000',  // Base URL for API requests
  baseURL: 'https://ecommerce-backend-evl1587ss-wael-alys-projects.vercel.app',
});

export default axiosInstance;
