import axios from 'axios';
 
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'  //'https://ecommerce-backend-z4v3.onrender.com'
});

export default axiosInstance;
