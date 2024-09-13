import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem } from '@mui/material';
import { ShoppingBasket, Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const HeaderWzSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const theme = useTheme();

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      </Menu>
    );
  
    const handleSearch_ = ()=>{
        onSearch(searchTerm);
    }


    return (
        <AppBar position="static" style={{margin:0, padding:0}}>
        <Toolbar>
          {/* Menu Icon for Mobile */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
  
          {/* App Name or Logo */}
          <Typography variant="h6" style={{ minWidth: '40vh' }} >
            Electronic Shop
          </Typography>
          
          
            <TextField    sx={{ backgroundColor: 'white', 
                                '& .MuiInputBase-input': {
                                    color: theme.palette.secondary.main , // Text color
                                    }
                                 }}
                label="Search Products"
                variant="filled"
                color='secondary'
                fullWidth
                size='small'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="contained" color="secondary"  onClick={handleSearch_} sx={{ ml: 2 }}>
                Search
            </Button>
         

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
    );
};

export default HeaderWzSearch;
