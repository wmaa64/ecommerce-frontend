import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography, Paper } from '@mui/material';
import axios from '../api/axios';
import SubcategoryForm from '../components/SubcategoryForm'; // Import the SubcategoryForm component
import SubcategoryTable from '../components/SubcategoryTable'; // Import the SubcategoryTable component

const SubcategoryManagementPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentSubcategory, setCurrentSubcategory] = useState(null); // State to manage the current subcategory being edited
  const [subcategories, setSubcategories] = useState([]); // State to store subcategories
  const [categories, setCategories] = useState([]); // State to store categories for dropdown in the form

  useEffect(() => {
    // Fetch subcategories and categories from backend on component mount
    const fetchData = async () => {
      const subcatRes = await axios.get('/api/subcategories');
      setSubcategories(subcatRes.data);
      const catRes = await axios.get('/api/categories');
      setCategories(catRes.data);
    };
    fetchData();
  }, []);

  const handleAddSubcategoryClick = () => {
    setCurrentSubcategory(null); // Reset currentSubcategory when adding a new subcategory
    setShowForm(true); // Show the form
  };

  const handleEditSubcategoryClick = (subcategory) => {
    setCurrentSubcategory(subcategory); // Set the current subcategory being edited
    setShowForm(true); // Show the form
  };

  const handleFormSave = async () => {
    // Fetch updated subcategories from backend
    const res = await axios.get('/api/subcategories');
    setSubcategories(res.data);
    setShowForm(false); // Hide the form after saving
    setCurrentSubcategory(null); // Reset currentSubcategory after save
  };

  const handleDeleteSubcategory = async (id) => {
    await axios.delete(`/api/subcategories/${id}`);
    setSubcategories(subcategories.filter((subcat) => subcat._id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Subcategories
      </Typography>
      <Grid container spacing={2}>
        {/* Left Section: Subcategory Form */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6">
              {currentSubcategory ? 'Edit Subcategory' : 'Add Subcategory'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSubcategoryClick}
              style={{ marginBottom: '16px' }}
            >
              Add New Subcategory
            </Button>
            {showForm && (
              <SubcategoryForm
                currentSubcategory={currentSubcategory}
                onSave={handleFormSave}
                categories={categories} // Pass categories to populate the dropdown
              />
            )}
          </Paper>
        </Grid>

        {/* Right Section: Subcategory Table */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <SubcategoryTable
              subcategories={subcategories}
              onEditSubcategory={handleEditSubcategoryClick}
              onDeleteSubcategory={handleDeleteSubcategory}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SubcategoryManagementPage;
