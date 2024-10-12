import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { CircularProgress , Typography, Container, Grid, Paper, Button} from '@mui/material';
import ProductList from '../components/ProducList';
import CategoryTreeView from '../components/CategoryTreeView';
import HeaderWzSearch from '../components/HeaderWzSearch';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNewProduct,setIsNewProduct] = useState(true);
  const [basketCount, setBasketCount] = useState(0);
 
  //const [showForm, setShowForm] = useState(false);
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
  }, []);


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
      <div style={{margin:0, padding:0}}>
        <HeaderWzSearch  currentBasketCount={basketCount} onSearch={handleSearch}  />
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
            </Paper>
          </Grid>

          {/* Right Section (2/3 of the screen) because md is 8 from 12*/}
          <Grid item xs={12} md={9}>
            <Paper elevation={4} sx={{ padding: 2, height: '100vh' }}>
                <div>
                  {(products.length>0 && (isNewProduct)) && <Typography variant='body2' sx={{color: 'blue', }}>New Products</Typography>}
                  {(products.length>0 && (!isNewProduct)) && <Typography variant='body2' sx={{color: 'blue', }}>Search Results</Typography>}

                  {(loading) ? 
                    ( <CircularProgress /> ) : ( <ProductList products={products} maxwd={200} onAddToBasket={handleAddToBasket} />)
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
