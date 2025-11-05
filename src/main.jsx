import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import Dashboard from './page/Dashboard';
import AdminPage from './page/AdminPage';
import LoginModal from './components/LoginModal';
import PrivateRoute from './components/PrivateRoute';
import ProductListPage from './page/ProductListPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/product" element={<ProductListPage />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);