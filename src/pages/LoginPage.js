import { useState } from 'react';
import { Button, TextField, Container } from '@mui/material';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(res.data));

      // Fetch the basket after login
      const userId = res.data._id;
      
      const basketResponse = await axios.get(`/api/basket/${userId}`);

      // Check if basket items exist
      if (basketResponse.data && basketResponse.data.items) {
        localStorage.setItem('basketItems', JSON.stringify(basketResponse.data.items));
      } else {
        console.log('No items in basket');
        localStorage.setItem('basketItems', JSON.stringify([])); // Store an empty array if no items
      }

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <h1>Sign In</h1>
      <form onSubmit={submitHandler}>
        <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" variant="outlined" fullWidth margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Sign In</Button>
      </form>
    </Container>
  );
};

export default LoginScreen;
