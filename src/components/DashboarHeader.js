// Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem } from '@mui/material';
import { ShoppingBasket, Menu as MenuIcon, AccountCircle } from '@mui/icons-material';

const DashboardHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPage, setSelectedPage] = useState(''); // State to track selected page
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (page) => {
    setSelectedPage(page); // Set the selected page to render
    handleMenuClose(); // Close the menu after selecting an item
  };

  // Render content based on the selected page
  const renderPageContent = () => {
    switch (selectedPage) {
        case 'CategoryManagementPage':
            return <CategoryManagementPage />; // This will display your ManageCategoryPage component
        case 'SubcategoryManagementPage':
            return <SubcategoryManagementPage />;  // This will display your ManageProductPage component
        case 'ProductManagementPage':
            return <ProductManagementPage />;  // This will display your ManageProductPage component    
        default:
            return <Typography variant="h6">Please select an option from the drawer</Typography>;
    }
  };
    
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="dashboard-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handlePageChange('CategoryManagementPage')}>Manage Categories</MenuItem>
      <MenuItem onClick={() => handlePageChange('SubcategoryManagementPage')}>Manage SubCategories</MenuItem>
      <MenuItem onClick={() => handlePageChange('ProductManagementPage')}>Manage Products</MenuItem>            
    </Menu>
  );

  return (
    <div>
    <AppBar position="static" style={{margin:0, padding:0}}>
      <Toolbar>
        {/* Menu Icon for Mobile */}
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>

        {/* App Name or Logo */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Electronic Shop - Dashboard
        </Typography>

        {/* Shopping Basket Icon */}
        <IconButton color="inherit">
          <Badge badgeContent={0} color="secondary">
            <ShoppingBasket />
          </Badge>
        </IconButton>

        {/* Account Icon */}
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
      {renderMenu}
    </AppBar>
    {renderPageContent()}
    </div>    
  );
};

export default DashboardHeader;
