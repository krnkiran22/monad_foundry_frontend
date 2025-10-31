import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Enterprise-grade Button Component
 * Follows Corporate Minimalism design system
 * 
 * Variants:
 * - primary: Dark background, white text
 * - secondary: White background, dark text, bordered
 * - outline: Transparent background, dark text, bordered
 * - ghost: Transparent background, no border
 * - danger: Red background, white text
 * 
 * Sizes: sm, md, lg
 */

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  
  // Variant styles
  const variants = {
    primary: 'bg-[#0F172A] text-white hover:bg-[#1E293B] focus-visible:outline-[#0F172A] disabled:bg-[#E5E5E5] disabled:text-[#999999]',
    secondary: 'bg-white text-[#1A1A1A] border border-[#E5E5E5] hover:bg-[#FAFAFA] hover:border-[#D1D5DB] focus-visible:outline-[#0F172A] disabled:bg-[#FAFAFA] disabled:text-[#999999] disabled:border-[#E5E5E5]',
    outline: 'bg-transparent text-[#1A1A1A] border border-[#E5E5E5] hover:bg-[#FAFAFA] hover:border-[#D1D5DB] focus-visible:outline-[#0F172A] disabled:text-[#999999] disabled:border-[#E5E5E5]',
    ghost: 'bg-transparent text-[#1A1A1A] hover:bg-[#FAFAFA] focus-visible:outline-[#0F172A] disabled:text-[#999999]',
    danger: 'bg-[#DC2626] text-white hover:bg-[#B91C1C] focus-visible:outline-[#DC2626] disabled:bg-[#E5E5E5] disabled:text-[#999999]',
  };
  
  // Size styles
  const sizes = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5',
  };
  
  const isDisabled = disabled || loading;
  
  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${isDisabled ? 'cursor-not-allowed' : 'active:scale-[0.98]'}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
