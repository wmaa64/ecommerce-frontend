import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import {Container, Grid, Paper,Typography, Button } from '@mui/material';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';

const ProductManagementPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // State to manage the current Product being edited
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [shops, setShops] = useState([]);

  // Check if the user is logged in by fetching userInfo from localStorage
  const userInfo = localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo')) : null ;
  
  // Fetch products and subcategories  and user-shops on page load
  useEffect(() => {
    const fetchData = async () => {
      const productRes = await axios.get(`/api/products/user-products/${userInfo._id}`);
      setProducts(productRes.data);
      const subcatRes = await axios.get('/api/subcategories');
      setSubcategories(subcatRes.data);
      //Get Shops For User Logged
      const shopRes = await axios.get(`/api/shops/${userInfo._id}`);
      setShops(shopRes.data);

    };
    fetchData();
  }, []);

  // Handle adding or updating a product
  /*
  const handleSaveProduct = async (productData) => {
    if (currentProduct) {
      // Update product
      const updatedProduct = await axios.put(`/api/products/${currentProduct._id}`, productData);
      setProducts(products.map((p) => (p._id === updatedProduct.data._id ? updatedProduct.data : p)));
    } else {
      // Add product
      const newProduct = await axios.post('/api/products', productData);
      setProducts([...products, newProduct.data]);
    }
    setCurrentProduct(null); // Reset the form after saving
  };
  */
  const handleAddProductClick = () => {
    setCurrentProduct(null); // Reset currentSubcategory when adding a new subcategory
    setShowForm(true); // Show the form
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setCurrentProduct(product); // Populate the form with the selected product
    setShowForm(true); // Show the form
  };
  
  const handleFormSave = async () => {
    // Fetch updated products from backend
    const res = await axios.get('/api/products');
    setProducts(res.data);
    setShowForm(false); // Hide the form after saving
    setCurrentProduct(null); // Reset currentProduct after save
  };


  // Handle delete product
  const handleDeleteProduct = async (id) => {
    await axios.delete(`/api/products/${id}`);
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
  <Container>
    <Typography variant="h4" gutterBottom>
      Manage Products
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h6">
            {currentProduct ? 'Edit Product' : 'Add Product'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProductClick}
            style={{ marginBottom: '16px' }}
          >
            Add New Product
          </Button>
          {showForm && (
            <ProductForm
              currentProduct={currentProduct}
              onSave={handleFormSave}
              subcategories={subcategories} // Pass subcategories to populate the dropdown
              shops={shops} // Pass shops to populate the dropdown
            />
          )}
        </Paper>
        {/* Product Form on the left side */}
        {/*<ProductForm
          subcategories={subcategories}
          currentProduct={currentProduct}
          onSave={handleSaveProduct}
          />*/}

      </Grid>
      <Grid item xs={8}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <ProductTable
            products={products}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </Paper>

        {/* Product Table on the right side */}
        {/*<ProductTable
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />*/}
      </Grid>
    </Grid>
  </Container>
  );
};

export default ProductManagementPage;
