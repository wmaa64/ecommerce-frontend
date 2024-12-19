import React, { useEffect, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CategoryManagementPage from './pages/CategoryManagementPage';
import SubcategoryManagementPage from './pages/SubcategoryManagementPage';
import ProductManagementPage from './pages/ProductManagementPage';
import ShopManagementPage from './pages/ShopManagementPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BasketPage from './pages/BasketPage';
import LandingPage from './pages/LandingPage';


function App() {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    if(i18n.language === 'en'){
      setDirection('ltr');
      document.documentElement.setAttribute('dir', 'ltr');
    }else{
      setDirection('rtl');
      document.documentElement.setAttribute('dir', 'rtl');
    }
  }, [i18n.language]);

  const theme = createTheme({
    direction: direction,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Landing page route */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/manage-categories" element={<CategoryManagementPage />} /> {/* Add the route */}
          <Route path="/manage-subcategories" element={<SubcategoryManagementPage />} /> {/* Add the route */}
          <Route path="/manage-products" element={<ProductManagementPage />} /> {/* Add the route */}
          <Route path="/manage-shops" element={<ShopManagementPage />} /> {/* Add the route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/basket/:userId" element={<BasketPage  maxwd={200} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
