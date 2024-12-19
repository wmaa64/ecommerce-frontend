import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Box, Checkbox, FormControlLabel, Button } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useTranslation } from 'react-i18next';
 

const CategoryTreeView = ({ onSearch })=>{
    const [categories, setCategories] = useState([]);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const { t, i18n } = useTranslation(); // Initialize useTranslation

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
    }, [i18n.language]);


const handleSearch_ = ()=>{
      onSearch(selectedNodes);
  }


// Handle checkbox selection
const handleCheckboxChange = (event, nodeId) => {
    if (event.target.checked) {
      setSelectedNodes((prev) => [...prev, nodeId]);
    } else {
      setSelectedNodes((prev) => prev.filter((id) => id !== nodeId));
    }
  };



    // Recursive function to render TreeItem components
const renderTreeItems = (nodes) => {
    return nodes.map((node) => (
      <TreeItem 
        key={node.id}
        //nodeId={node.id}
        itemId={node.id}
        label={node.label}    
      >
        {node.children && renderChildTreeItems(node.children)}
      </TreeItem>
    ));
  };

// Recursive function to render TreeItem components
const renderChildTreeItems = (nodes) => {
    return nodes.map((node) => (
      <TreeItem 
        key={node.id}
        //nodeId={node.id}
        itemId={node.id}
        label={
            <FormControlLabel  
              control={
                <Checkbox
                  checked={selectedNodes.includes(node.id)}
                  onChange={(event) => handleCheckboxChange(event, node.id)}
                />
              }
              label={node.label}
              
            />
        }    
        
        
        //onClick={() => handleNodeToggle(node.id)}
        onClick={null}
        // Pass any additional props you might need
      >
        {node.children && renderChildTreeItems(node.children)}
      </TreeItem>
    ));
  };



  // Convert your data to the required format
  const formatTreeData = (data) => 
    data.map((category) => ({
      id: category._id ,
      label: i18n.language === 'en' ? category.name.en : category.name.ar ,
      children: category.subcategories.map((subcategory) => ({
        id: subcategory._id ,
        label: i18n.language === 'en' ?  subcategory.name.en : subcategory.name.ar ,
      })),
    }));

  const treeData = formatTreeData(categories);

  return (
    <Box>
      <Button variant="contained" color="secondary" onClick={handleSearch_} sx={{ ml: 2 }}>{t("searchButton")}</Button>

      <SimpleTreeView sx={{color: 'blue', fontSize: '1.5px' }}>
        {renderTreeItems(treeData)}
      </SimpleTreeView>
    </Box>
  );

};

export default CategoryTreeView;