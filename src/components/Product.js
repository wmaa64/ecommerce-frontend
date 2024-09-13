import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const Product = ({ product, maxwd }) => {
  return (
    <Card sx={{maxWidth: maxwd }}>
      <Link to={`/product/${product._id}`}>
        <CardMedia 
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ height: maxwd, objectFit: 'cover' }}
        />
      </Link>
      <CardContent>
        <Typography variant= "subtitle2"   >{product.name}</Typography>
        <Typography variant= "subtitle2"   >${product.price}</Typography>
      </CardContent>
    </Card>
  );
};
 
export default Product;