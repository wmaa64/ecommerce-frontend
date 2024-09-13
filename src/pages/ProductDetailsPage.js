import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
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
    navigate(-1);
  }

  if (loading) return <CircularProgress />

  return (
    <Container>
      <Typography variant="h3">{product.title}</Typography>
      <img src={product.image} alt={product.title} style={{ width: '40%' }} />
      <Typography variant="h5">${product.price}</Typography>
      <Typography variant="body1">{product.description}</Typography>
      <Box display="flex" >
        <Button variant="contained" color="primary" sx={{mr:2}}>Add to Cart</Button>
        <Button variant="contained" color="primary" onClick={handelGoBack}>Go Back</Button>
      </Box>
      
    </Container>
  );
};

export default ProductDetailsPage;
