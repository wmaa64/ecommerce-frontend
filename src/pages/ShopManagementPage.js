import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography, Paper } from '@mui/material';
import axios from '../api/axios';
import ShopForm from '../components/ShopForm'; // Import the ShopForm component
import ShopTable from '../components/ShopTable'; // Import the ShopTable component

const ShopManagementPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentShop, setCurrentShop] = useState(null); // State to manage the current Shop being edited
  const [shops, setShops] = useState([]); // State to store shops
  const [users, setUsers] = useState([]); // State to store users for dropdown in the form

  // Check if the user is logged in by fetching userInfo from localStorage
  const userInfo = localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo')) : null ;
  
  useEffect(() => {
    // Fetch shops and users from backend on component mount
    const fetchData = async () => {
      const shopRes = await axios.get(`/api/shops/${userInfo._id}`);
      setShops(shopRes.data);
      const userRes = await axios.get('/api/users');
      setUsers(userRes.data);
    };
    fetchData();
  }, []);

  const handleAddShopClick = () => {
    setCurrentShop(null); // Reset currentShop when adding a new Shop
    setShowForm(true); // Show the form
  };

  const handleEditShopClick = (Shop) => {
    setCurrentShop(Shop); // Set the current Shop being edited
    setShowForm(true); // Show the form
  };

  const handleFormSave = async () => {
    // Fetch updated shops from backend
    const res = await axios.get(`/api/shops/${userInfo._id}`);
    setShops(res.data);
    setShowForm(false); // Hide the form after saving
    setCurrentShop(null); // Reset currentShop after save
  };

  const handleDeleteShop = async (id) => {
    await axios.delete(`/api/shops/${id}`);
    setShops(shops.filter((shop) => shop._id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Shops
      </Typography>
      <Grid container spacing={2}>
        {/* Left Section: Shop Form */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6">
              {currentShop ? 'Edit Shop' : 'Add Shop'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddShopClick}
              style={{ marginBottom: '16px' }}
            >
              Add New Shop
            </Button>
            {showForm && (
              <ShopForm
                currentShop={currentShop}
                onSave={handleFormSave}
                users={users} // Pass users to populate the dropdown
              />
            )}
          </Paper>
        </Grid>

        {/* Right Section: Shop Table */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <ShopTable
              shops={shops}
              onEditShop={handleEditShopClick}
              onDeleteShop={handleDeleteShop}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopManagementPage;
