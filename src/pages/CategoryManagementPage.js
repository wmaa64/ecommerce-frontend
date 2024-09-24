import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography, Paper } from '@mui/material';
import CategoryForm from '../components/CategoryForm'; // Import the CategoryForm component
import CategoryTable from '../components/CategoryTable'; // Import the CategoryTable component
import axios from '../api/axios';
import Header from '../components/Header';


const CategoryManagementPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null); // State to manage the current category being edited
  const [categories, setCategories] = useState([]); // State to store categories

  useEffect(() => {
    // Fetch categories from backend on component mount
    const fetchCategories = async () => {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleAddCategoryClick = () => {
    setCurrentCategory(null); // Reset currentCategory when adding a new category
    setShowForm(true); // Show the form
  };

  const handleEditCategoryClick = (category) => {
    setCurrentCategory(category); // Set the current category being edited
    setShowForm(true); // Show the form
  };

  const handleFormSave = async () => {
    // Fetch updated categories from backend
    const res = await axios.get('/api/categories');
    setCategories(res.data);
    setShowForm(false); // Hide the form after saving
    setCurrentCategory(null); // Reset currentCategory after save
  };

  const handleDeleteCategory = async (id) => {
    await axios.delete(`/api/categories/${id}`);
    setCategories(categories.filter((cat) => cat._id !== id));
  };

  return (
    <div>
    <Container maxWidth={false} sx={{
        margin:0,
        padding: 0,
      }}>
      <Typography variant="h4" gutterBottom>
        Manage Categories
      </Typography>
      <Grid container spacing={2} style={{ height: '100vh', width: '100vw', margin: 0 }} >
        {/* Left Section: Category Form */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ padding: 2, height: '100vh' }} >
            <Typography variant="h6">
              {currentCategory ? 'Edit Category' : 'Add Category'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategoryClick}
              style={{ marginBottom: '16px' }}
            >
              Add New Category
            </Button>
            {showForm && (
              <CategoryForm
                currentCategory={currentCategory}
                onSave={handleFormSave}
              />
            )}
          </Paper>
        </Grid>

        {/* Right Section: Category Table */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3}  sx={{ padding: 2, height: '100vh' }} >
            <CategoryTable
              categories={categories}
              onEditCategory={handleEditCategoryClick}
              onDeleteCategory={handleDeleteCategory}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default CategoryManagementPage;
