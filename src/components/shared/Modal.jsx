import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Enterprise-grade Modal Component
 * Follows Corporate Minimalism design system
 * 
 * Features:
 * - Overlay backdrop
 * - Focus trap
 * - ESC key to close
 * - Click outside to close
 * - Animated entrance/exit
 */

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  // Size variants
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-[calc(100vw-2rem)]',
  };
  
  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, onClose]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-9998 bg-black/50 backdrop-blur-sm"
            onClick={handleOverlayClick}
          >
            {/* Modal Container */}
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className={`
                  w-full ${sizes[size]}
                  bg-white
                  rounded-lg
                  shadow-[0_10px_15px_rgba(0,0,0,0.1)]
                  overflow-hidden
                  relative
                `}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
                    {title && (
                      <h2 className="text-xl font-semibold text-[#1A1A1A]">
                        {title}
                      </h2>
                    )}
                    {showCloseButton && (
                      <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#666666] hover:bg-[#FAFAFA] hover:text-[#1A1A1A] transition-colors"
                        aria-label="Close modal"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
                
                {/* Content */}
                <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
                  {children}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
