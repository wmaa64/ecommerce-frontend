import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from '../api/axios';

const ProductForm = ({ currentProduct, onSave , subcategories , shops }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [shopId, setShopId] = useState('');
  const [imageFile, setImageFile] = useState(null); // File state for image upload
  const [uploading, setUploading] = useState(false); // Track the upload status

  // Check if the user is logged in by fetching userInfo from localStorage
  const userInfo = localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo')) : null ;

  // Populate form with selected product details (for editing)
  useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setPrice(currentProduct.price);
      setImage(currentProduct.image);
      setBrand(currentProduct.brand);
      setCountInStock(currentProduct.countInStock);
      setDescription(currentProduct.description);

      // Handle both populated object (from .populate) and plain string ID
      const subcategoryIdValue = currentProduct.subcategoryId?._id 
      ? currentProduct.subcategoryId._id // If populated, use the _id field
      : currentProduct.subcategoryId; // Else, use the plain subcategoryId

      setSubcategoryId(subcategoryIdValue);
      // Handle both populated object (from .populate) and plain string ID
      const shopIdValue = currentProduct.shopId?._id 
      ? currentProduct.shopId._id // If populated, use the _id field
      : currentProduct.shopId; // Else, use the plain shopId

      setShopId(shopIdValue);
      
    } else {
      // Reset form for adding a new product
      setName('');
      setPrice('');
      setImage('');
      setBrand('');
      setCountInStock('');
      setDescription('');
      setSubcategoryId('');
      setShopId('');
    }
  }, [currentProduct]);

  // Handle image file upload via backend API
  const handleImageUpload = async () => {
    if (!imageFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', imageFile); // Attach file to formData

    try {
      const res = await axios.post('/api/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImage(res.data.imageUrl); // Set the image URL in the state after upload
    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      setUploading(false);
    }
  };



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price, image, brand, countInStock, description, subcategoryId, shopId };
    // Add createdAt only when adding a new product
    if (!currentProduct) {
      productData.createdAt = new Date(); // Set current date
    }

    if (currentProduct) {
      await axios.put(`/api/products/${currentProduct._id}`, productData);
    } else {
      await axios.post('/api/products', productData);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Name" value={name} variant='filled' size='small' onChange={(e) => setName(e.target.value)} fullWidth required />
      <TextField label="Price" value={price} variant='filled' size='small' onChange={(e) => setPrice(e.target.value)} fullWidth required />

      {/* File input for image upload */}
      <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
      <Button 
        onClick={handleImageUpload} 
        variant="contained" 
        color="primary" 
        disabled={uploading || !imageFile}
        fullWidth
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </Button>

      <TextField label="Image URL" value={image} variant='filled' size='small' onChange={(e) => setImage(e.target.value)} fullWidth />
      <TextField label="Brand" value={brand} variant='filled' size='small' onChange={(e) => setBrand(e.target.value)} fullWidth />
      <TextField label="Count in Stock" value={countInStock} variant='filled' size='small' onChange={(e) => setCountInStock(e.target.value)} fullWidth required />
      <TextField label="Description" value={description} variant='filled' size='small' onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={4} />
      <TextField
        select
        label="Subcategory"
        value={subcategoryId}
        variant='filled' size='small' 
        onChange={(e) => setSubcategoryId(e.target.value)}
        fullWidth
        required
      >
        {subcategories.map((subcategory) => (
          <MenuItem key={subcategory._id} value={subcategory._id}>
            {subcategory.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Shop"
        value={shopId}
        variant='filled' size='small' 
        onChange={(e) => setShopId(e.target.value)}
        fullWidth
        required
      >
        {shops.map((shop) => (
          <MenuItem key={shop._id} value={shop._id}>
            {shop.name}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained" color="secondary" fullWidth>
        {currentProduct ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  );
};

export default ProductForm;
