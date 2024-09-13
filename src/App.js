import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CategoryManagementPage from './pages/CategoryManagementPage';
import SubcategoryManagementPage from './pages/SubcategoryManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/manage-categories" element={<CategoryManagementPage />} /> {/* Add the route */}
        <Route path="/manage-subcategories" element={<SubcategoryManagementPage />} /> {/* Add the route */}
      </Routes>
    </Router>
  );
}

export default App;
