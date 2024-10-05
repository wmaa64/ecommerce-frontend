import React from 'react';
import { Table, TableBody, TableCell,TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductTable = ({ products, onEditProduct, onDeleteProduct }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Count in Stock</TableCell>
            <TableCell>Subcategory</TableCell>
            <TableCell>UserShop</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.countInStock}</TableCell>
              <TableCell>{product.subcategoryId.name}</TableCell> {/* Display the name of the subcategory */}
              <TableCell>{product.shopId.name}</TableCell> {/* Display the name of the shop */}
              <TableCell>
                <IconButton onClick={() => onEditProduct(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDeleteProduct(product._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
