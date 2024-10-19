import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Paper, IconButton, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';

const BasketPage = ({maxwd}) => {
  const { userId } = useParams();

  const [basketItems, setBasketItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch basket items for the logged-in user
    const fetchBasketItems = async () => {
      try {
        const response = await axios.get(`/api/basket/${userId}`);
        setBasketItems(response.data.items);  // Updated to reflect 'items' array from basket
        calculateTotalPrice(response.data.items);
      } catch (error) {
        console.error('Error fetching basket items:', error);
      }
    };

    fetchBasketItems();
  }, [userId]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0); // 'productId' references Product
    setTotalPrice(total);
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(`/api/basket/remove/${userId}/${productId}`);
      setBasketItems(response.data.items); // Updated after removing the item
      calculateTotalPrice(response.data.items);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleDeleteUserBasket = async (userId) => {
    try {
        await axios.delete(`/api/basket/${userId}`);
  
        // Clear the local basket state
        localStorage.removeItem('basketItems');
        setBasketItems([]);
        setTotalPrice(0);
        alert('User basket cleared successfully!');
    } catch (error) {
      console.error('Error Deleting User Basket:', error);
      alert('Error Deleting User Basket');
    }
  };


  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(`/api/orders`, {
        userId,
        products: basketItems,
        totalPrice
      });
      alert('Order Placed successefully');

      if (response.status === 201) {
        handleDeleteUserBasket(userId);
        handlePayment(response.data._id);
      }
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  const handlePayment = async (orderId) => {
    try {
      const orderData = {
        userId,           // The user ID from params
        products: basketItems,  // The basket items (products and quantities)
        totalPrice        // Total price of the order
      };
  
      // Step 1: Call the backend to initiate Paymob payment
      const response = await axios.post('/api/payments/paymob', orderData);
  
      if (response.status === 200) {
        const { paymentKey } = response.data;
        
        // Step 2: Redirect user to Paymob’s payment page
        window.location.href = `https://accept.paymob.com/api/acceptance/iframes/872596?payment_token=${paymentKey}`;
      } else {
        alert('Error initiating payment.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment.');
    }
  };
  

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} > 
            <Typography variant="h5">Your Basket</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={12} > 
        <Paper elevation={4} sx={{ padding: 2, height: 'auto' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }} >
                {basketItems.length === 0 ? (
                    <Typography variant="body1">Your basket is empty.</Typography>
                ) : (
                    basketItems.map((item) => (
                    
                        <Card key={item.productId._id} sx={{maxWidth: maxwd }}>
                            <CardMedia 
                                component="img"
                                image={item.productId.image}
                                alt={item.productId.name}
                                sx={{ height: maxwd, objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Typography variant="subtitle2">{item.productId.name}</Typography>
                                <Typography variant="subtitle2">Price: EGP {item.productId.price}</Typography>
                                <Typography variant="subtitle2">Quantity: {item.quantity}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton color="secondary" onClick={() => handleRemoveItem(item.productId._id)} >
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    
                    ))
                )}
            </div>
        </Paper>
      </Grid>
      
      <Grid item xs={12}>
        <Typography variant="h5">Total: EGP {totalPrice.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Grid>
    </Grid>
  );
};

export default BasketPage;
