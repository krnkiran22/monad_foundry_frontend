import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, XCircle, Info } from 'lucide-react';

/**
 * Toast Notification Component
 * Professional notification system
 */

const Toast = ({ id, type = 'info', message, duration = 5000, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);
  
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };
  
  const config = {
    success: {
      bg: 'bg-[#DCFCE7]',
      border: 'border-[#16A34A]',
      text: 'text-[#16A34A]',
      icon: CheckCircle2,
    },
    warning: {
      bg: 'bg-[#FED7AA]',
      border: 'border-[#EA580C]',
      text: 'text-[#EA580C]',
      icon: AlertCircle,
    },
    error: {
      bg: 'bg-[#FEE2E2]',
      border: 'border-[#DC2626]',
      text: 'text-[#DC2626]',
      icon: XCircle,
    },
    info: {
      bg: 'bg-[#DBEAFE]',
      border: 'border-[#0284C7]',
      text: 'text-[#0284C7]',
      icon: Info,
    },
  };
  
  const { bg, border, text, icon: Icon } = config[type];
  
  return (
    <div
      className={`
        ${bg} ${border} ${text}
        w-full max-w-sm p-4 rounded-lg border-l-4
        shadow-[0_4px_12px_rgba(0,0,0,0.1)]
        flex items-start gap-3
        transition-all duration-300
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      `}
    >
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      
      <p className="flex-1 text-sm font-medium">{message}</p>
      
      <button
        onClick={handleClose}
        className="shrink-0 p-1 rounded hover:bg-black/10 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Toast Container
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-9999 flex flex-col gap-3 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={removeToast}
          />
        ))}
      </div>
    </div>
  );
};

export default Toast;
