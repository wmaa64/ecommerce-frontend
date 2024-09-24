import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { CircularProgress , Typography, Container, Grid, Paper, Button} from '@mui/material';
//import Header from '../components/Header' ;
import ProductList from '../components/ProducList';
//import Search from '../components/search';
import CategoryTreeView from '../components/CategoryTreeView';
import HeaderWzSearch from '../components/HeaderWzSearch';
import { Link } from 'react-router-dom' ;
//import CategoryForm from '../components/CategoryForm' ;


const HomePage = () => {
  const [products, setProducts] = useState([]);
  //const [newProducts, setNewProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNewProduct,setIsNewProduct] = useState(true);
 
  //const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make the request to the backend's /api/products endpoint
        const response = await axios.get('/api/products/created-today');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);
  
 // Fetch categories and subcategories from the backend
 useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  fetchCategories();
}, []);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    (isNewProduct) && setIsNewProduct(false);
    try {
        const response = await axios.get(`/api/products/searching?query=${searchTerm}`);
        setProducts(response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    setLoading(false);
};


const handleSubCatsSearch = async (selectedNodes) => {
  setLoading(true);
  (isNewProduct) && setIsNewProduct(false);
  try {
     // Convert selectedNodes array to a comma-separated string
     const subcategoryIds = selectedNodes.join(',');
     const response = await axios.get(`/api/products/subcategories-products?subcategoryIds=${subcategoryIds}`);

      //const response = await axios.get(`/api/products/searching?query=${searchTerm}`);
      setProducts(response.data);
  } catch (error) {
      console.error('Error fetching products:', error);
  }
  setLoading(false);
};

  return (
    <div>
      <div style={{margin:0, padding:0}}>
        <HeaderWzSearch onSearch={handleSearch} />
      </div>

      {/* Main Content Section */}
      <Container maxWidth={false} sx={{
        margin:0,
        padding: 0,
      }}>
        
        <Grid container spacing={2} style={{ height: '100vh', width: '100vw', margin: 0 }} >
          {/* Left Section (1/3 of the screen) because md is 4 from 12*/}
          <Grid item xs={12} md={3}>
            <Paper elevation={4} sx={{ padding: 2, height: '100vh' }}>
              <Typography variant="subtitle2" sx={{color: 'blue', }} >Choose SubCategories, Then Press Search...</Typography>
              {/* Content for the left section */}
              <CategoryTreeView  onSearch={handleSubCatsSearch} />

              {/*
              <Button component={Link} to="/manage-categories" variant="contained" color="secondary" sx={{mb: '4px'}}>
                Manage Categories
              </Button>
              <Button component={Link} to="/manage-subcategories" variant="contained" color="secondary" sx={{marginBottom: '4px'}}>
                Manage Subcategories
              </Button>
              <Button component={Link} to="/manage-products" variant="contained" color="secondary" sx={{marginBottom: '4px'}}>
                Manage Products
              </Button>
              */}
              
            </Paper>
          </Grid>

          {/* Right Section (2/3 of the screen) because md is 8 from 12*/}
          <Grid item xs={12} md={9}>
            <Paper elevation={4} sx={{ padding: 2, height: '100vh' }}>
                <div>
                  {(products.length>0 && (isNewProduct)) && <Typography variant='body2' sx={{color: 'blue', }}>New Products</Typography>}
                  {(products.length>0 && (!isNewProduct)) && <Typography variant='body2' sx={{color: 'blue', }}>Search Results</Typography>}

                  {(loading) ? 
                    ( <CircularProgress /> ) : ( <ProductList products={products} maxwd={200} />)
                  }
                </div>            
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
