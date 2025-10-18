import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './global.css'
import Dashboard from './page/Dashboard';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);