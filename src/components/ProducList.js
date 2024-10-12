import React, { useState } from 'react';
import { Container, Grid, Pagination, Button } from '@mui/material';
import Product from './Product';


const ProductList = ({ products, maxwd, onAddToBasket }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3; // Number of products to display per page
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calculate the products to display for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container sx={{ margin_bottom: 2,
                     padding: 2
    }}>
      <Grid container   spacing={2}>
          {currentProducts.map((product) => (
              <Grid item   key={product._id}  xs={12} sm={6} md={4} lg={3}>
                <Product key={product._id} product={product} maxwd={maxwd}  onAddProductToBasket={onAddToBasket} />
              </Grid>
          ))}
          </Grid>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '20px' }}
      />
    </Container>
  );
};

export default ProductList;
