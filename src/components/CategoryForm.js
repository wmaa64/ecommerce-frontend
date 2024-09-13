import React, { useState, useEffect } from 'react';
import { Container, TextField, Button } from '@mui/material';
import axios from '../api/axios';

const CategoryForm = ({ currentCategory, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentCategory) {
      setName(currentCategory.name);
      setDescription(currentCategory.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [currentCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name, description };
    if (currentCategory) {
      await axios.put(`/api/categories/${currentCategory._id}`, categoryData);
    } else {
      await axios.post('/api/categories', categoryData);
    }
    onSave(); // Trigger the callback to notify parent component
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
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
        <Button type="submit" variant="contained" color="primary">
          {currentCategory ? 'Update Category' : 'Add Category'}
        </Button>
      </form>
    </Container>
  );
};

export default CategoryForm;
