import React, { useState, useEffect } from 'react';
import { Container, Grid, CircularProgress, Typography, Button, Box } from '@mui/material';
import axios from '../api/axios';
import HeaderWzSearch from '../components/HeaderWzSearch';
import ProductList from '../components/ProducList';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNewProduct,setIsNewProduct] = useState(true);
  const [basketCount, setBasketCount] = useState(0);
  
  const navigate = useNavigate();

    // Check if the user is logged in by fetching userInfo from localStorage
    const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) : null ;
  
      
    // Fetch the basket count when user logs in
    useEffect(() => {
      const basketItems = JSON.parse(localStorage.getItem('basketItems'));
      if (userInfo && basketItems) {
        setBasketCount(basketItems.length);
      }
    }, [basketCount]);
  
  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('/api/products/featured');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  // Fetch New Products Created Today
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make the request to the backend's /api/products endpoint
        const response = await axios.get('/api/products/created-today');
        setNewProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

   // Function to add a product to the basket
 const handleAddToBasket = async (productId) => {
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  if (!userInfo) {
    // If the user is not logged in, navigate them to the login page
    navigate('/login');
  } else {
    try {
      const response = await axios.post('/api/basket/add', { userId: userInfo._id, productId, quantity: 1, });

      // Optionally, update basket count in localStorage or trigger UI update
      const updatedBasket = await axios.get(`/api/basket/${userInfo._id}`);
      localStorage.setItem('basketItems', JSON.stringify(updatedBasket.data.items));
      
      const basketItems = JSON.parse(localStorage.getItem('basketItems'));
      //const basketItems = localStorage.getItem('basketItems');
      setBasketCount(basketItems.length);

      alert('Product added to basket!');
    } catch (error) {
      console.error('Error adding product to basket:', error);
      alert('Failed to add product to basket.');
    }
  }
};

  return (
    <div>
      {/* Header with search and basket */}
      <HeaderWzSearch currentBasketCount={basketCount} />

     {/* Hero Section */}
      <Box sx={{
        height: '60vh',  // Box height (adjust as needed)
        width: '100%',   // Ensure the Box spans the full width
        backgroundImage: 'url(https://res.cloudinary.com/djezf7wtn/image/upload/v1729536357/products/heroBannerBuy1.jpg)',  // Hero image URL
        backgroundSize: 'cover',  // Ensures the image is fully visible within the box
        backgroundPosition: 'center',  // Centers the image inside the box
        backgroundRepeat: 'no-repeat',  // Prevents the image from repeating
        display: 'flex',
        justifyContent:'right',
        alignItems:'baseline',
        color: '#fff',
        textAlign: 'center',
        padding: 0,  // Ensure no padding in the Box
        margin: 0,  // Ensure no margins in the Box
        overflow: 'hidden'  // Ensures no overflow in case the image is larger than the Box
        }}>
        <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)', p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Welcome to Our Store</Typography>
          <Typography variant="body2" gutterBottom>Discover the best products for you!</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/home')}>Shop Now</Button>
        </Box>
      </Box>

      {/* Featured Products Section */}
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>Featured Products</Typography>
        <Grid container spacing={4}>
            {(loading) ? 
                ( <CircularProgress /> ) : ( <ProductList products={featuredProducts} maxwd={250} onAddToBasket={handleAddToBasket} />)
                }
        </Grid>
      </Container>

      {/* New Products Section */}
      <Container sx={{ marginTop: 6 }}>
        {(newProducts.length>0) && <Typography variant="h4" gutterBottom>New Products</Typography> }
        
        <Grid container spacing={4} sx={{marginTop: 2}}>
            {(loading) ? 
            ( <CircularProgress /> ) : ( <ProductList products={newProducts} maxwd={250} onAddToBasket={handleAddToBasket} />)
            }
       </Grid>
      </Container>

      {/* Call to Action Section */}
      <Container sx={{ marginTop: 6, textAlign: 'center', padding: 4, bgcolor: '#f5f5f5' }}>
        <Typography variant="h5">Discover our Latest Collections!</Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate('/home')}>Shop Now</Button>
      </Container>

    </div>
  );
};

export default LandingPage;
