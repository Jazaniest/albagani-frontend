import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import Dashboard from './page/Dashboard';
import AdminPage from './page/AdminPage';
import { isLoggedIn } from './data/auth';
import LoginModal from './components/LoginModal';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginModal />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route path="/admin" element={isLoggedIn() ? <AdminPage /> : <Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);