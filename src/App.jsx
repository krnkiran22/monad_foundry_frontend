import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { WalletProvider, useWallet } from './hooks/useWallet';
import { ToastProvider } from './hooks/useToast';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

/**
 * Protected Route Wrapper
 * Redirects to landing if not connected
 */
const ProtectedRoute = ({ children }) => {
  const { account } = useWallet();
  
  if (!account) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

/**
 * App Router Component
 */
const AppRoutes = () => {
  const { connect } = useWallet();
  const navigate = useNavigate();
  
  const handleConnectWallet = async () => {
    try {
      await connect();
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage onConnectWallet={handleConnectWallet} />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      {/* Add more routes as they're built */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

/**
 * Main App Component
 * Enterprise-grade ERC20 Token Manager
 */
function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;
