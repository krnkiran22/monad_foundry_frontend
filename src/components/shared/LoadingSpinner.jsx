import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Loading Spinner Component
 * Professional loading indicator
 */

const LoadingSpinner = ({ 
  size = 'md', 
  text = '',
  fullScreen = false,
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };
  
  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className={`${sizes[size]} text-[#0F172A] animate-spin`} />
      {text && <p className="text-sm text-[#666666]">{text}</p>}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAFAFA]">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner;
