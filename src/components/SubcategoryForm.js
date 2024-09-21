import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, MenuItem } from '@mui/material';
import axios from '../api/axios';

const SubcategoryForm = ({ currentSubcategory, onSave, categories }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    if (currentSubcategory) {
      setName(currentSubcategory.name);
      setDescription(currentSubcategory.description);

      // Handle both populated object (from .populate) and plain string ID
      const categoryIdValue = currentSubcategory.categoryId?._id 
      ? currentSubcategory.categoryId._id // If populated, use the _id field
      : currentSubcategory.categoryId; // Else, use the plain categoryId

      setCategoryId(categoryIdValue);
      
    } else {
      setName('');
      setDescription('');
      setCategoryId('');
    }
  }, [currentSubcategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subcategoryData = { name, description, categoryId };
    if (currentSubcategory) {
      await axios.put(`/api/subcategories/${currentSubcategory._id}`, subcategoryData);
    } else {
      await axios.post('/api/subcategories', subcategoryData);
    }
    onSave(); // Trigger the callback to notify parent component
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Subcategory Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          fullWidth
          margin="normal"
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {currentSubcategory ? 'Update Subcategory' : 'Add Subcategory'}
        </Button>
      </form>
    </Container>
  );
};

export default SubcategoryForm;
