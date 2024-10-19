import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, CircularProgress, Box, IconButton, Badge } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  //const [basketCount, setBasketCount] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Make the request to the backend's /api/products endpoint
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }finally {
        setLoading(false);
      }

    };

    fetchProduct();
  }, [id]);

  const handelGoBack = ()=>{
    navigate('/');
  }

  if (loading) return <CircularProgress />

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
    
      alert('Product added to basket!');
    } catch (error) {
      console.error('Error adding product to basket:', error);
      alert('Failed to add product to basket.');
    }
  }
};

  return (
    <Container>
      <Typography variant="h3">{product.title}</Typography>
      <img src={product.image} alt={product.title} style={{ width: '40%' }} />
      <Typography variant="h5">EGP {product.price}</Typography>
      <Typography variant="body1">{product.description}</Typography>
      <Box display="flex" >
        {/*<Button variant="contained" color="primary" sx={{mr:2}}>Add to Cart</Button>*/}
        <IconButton color="primary" onClick={() => handleAddToBasket(product._id)}>
          <AddShoppingCartIcon />
        </IconButton>
        <Button variant="contained" color="primary" onClick={handelGoBack}>Go Back</Button>
      </Box>
      
    </Container>
  );
};

export default ProductDetailsPage;
