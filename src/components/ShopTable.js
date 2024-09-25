import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ShopTable = ({ shops, onEditShop, onDeleteShop }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shops.map((Shop) => (
            <TableRow key={Shop._id}>
              <TableCell>{Shop.name}</TableCell>
              <TableCell>{Shop.description}</TableCell>
              <TableCell>{Shop.image}</TableCell>
              <TableCell>{Shop.userId.name}</TableCell> {/* Display the name of the category */}
              <TableCell>
                <IconButton onClick={() => onEditShop(Shop)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDeleteShop(Shop._id)}>
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

export default ShopTable;
