import React, { useState } from 'react';
import { TextField, Box, Button, CircularProgress } from '@mui/material';
//import { TextField, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import axios from '../api/axios'
import ProductList from './ProducList';


const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/products/searching?query=${searchTerm}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    label="Search Products"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSearch} sx={{ ml: 2 }}>
                    Search
                </Button>
            </Box>

            {loading ? (
                <CircularProgress />
            ) : (
                <ProductList products={products} maxwd={300} />    
            )}
        </Box>
    );
};

export default ProductSearch;
