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

const SubcategoryTable = ({ subcategories, onEditSubcategory, onDeleteSubcategory }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subcategories.map((subcategory) => (
            <TableRow key={subcategory._id}>
              <TableCell>{subcategory.name}</TableCell>
              <TableCell>{subcategory.categoryId.name}</TableCell> {/* Display the name of the category */}
              <TableCell>{subcategory.description}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEditSubcategory(subcategory)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDeleteSubcategory(subcategory._id)}>
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

export default SubcategoryTable;
