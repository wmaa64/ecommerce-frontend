import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, MenuItem } from '@mui/material';
import axios from '../api/axios';

const ShopForm = ({ currentShop, onSave, users }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [userId, setUserId] = useState('');

  // Check if the user is logged in by fetching userInfo from localStorage
  const userInfo = localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo')) : null ;


  useEffect(() => {
    if (currentShop) {
      setName(currentShop.name);
      setDescription(currentShop.description);
      setImage(currentShop.image);

      // Handle both populated object (from .populate) and plain string ID
      /*
      const userIdValue = currentShop.userId?._id 
      ? currentShop.userId._id // If populated, use the _id field
      : currentShop.userId; // Else, use the plain userId
      */

      //setUserId(userIdValue);
      setUserId(userInfo._id);
      
    } else {
      setName('');
      setDescription('');
      setImage('');
      setUserId(userInfo._id);
    }
  }, [currentShop]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shopData = { name, description, image, userId };
    if (currentShop) {
      await axios.put(`/api/shops/${currentShop._id}`, shopData);
    } else {
      await axios.post('/api/shops', shopData);
    }
    onSave(); // Trigger the callback to notify parent component
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Shop Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/*<TextField
          select
          label="UserId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          fullWidth
          margin="normal"
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
          </TextField>*/}
          
        <Button type="submit" variant="contained" color="primary">
          {currentShop ? 'Update Shop' : 'Add Shop'}
        </Button>
      </form>
    </Container>
  );
};

export default ShopForm;
