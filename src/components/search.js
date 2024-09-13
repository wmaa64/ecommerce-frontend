import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch_ = ()=>{
        onSearch(searchTerm);
    }

    return (
        <Box paddingTop={1} >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                label="Search Products"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSearch_} sx={{ ml: 2 }}>
                Search
            </Button>
        </Box>
        </Box>
    );
};

export default Search;
