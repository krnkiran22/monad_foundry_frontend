import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastContainer } from '../components/shared/Toast';

/**
 * Toast Context & Hook
 * Professional notification system
 */

const ToastContext = createContext(null);

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  const addToast = useCallback(({ type = 'info', message, duration = 5000 }) => {
    const id = toastId++;
    const toast = { id, type, message, duration };
    
    setToasts((prev) => [...prev, toast]);
    
    return id;
  }, []);
  
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);
  
  const toast = {
    success: (message, duration) => addToast({ type: 'success', message, duration }),
    error: (message, duration) => addToast({ type: 'error', message, duration }),
    warning: (message, duration) => addToast({ type: 'warning', message, duration }),
    info: (message, duration) => addToast({ type: 'info', message, duration }),
  };
  
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default useToast;
