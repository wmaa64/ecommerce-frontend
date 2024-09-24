import { useState } from 'react';
import { Button, TextField, Container, Checkbox, FormControlLabel } from '@mui/material';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('/api/users', { name, email, password, isSeller });
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <TextField label="Name" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" variant="outlined" fullWidth margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField label="Confirm Password" variant="outlined" fullWidth margin="normal" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <FormControlLabel 
          control={
            <Checkbox 
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)} 
            />
          }
          label='Register as Seller'
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
      </form>
    </Container>
  );
};

export default RegisterScreen;
