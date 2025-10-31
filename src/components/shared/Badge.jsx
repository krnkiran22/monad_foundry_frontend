import React from 'react';

/**
 * Enterprise-grade Badge Component
 * Follows Corporate Minimalism design system
 * 
 * Variants:
 * - default: Light gray background
 * - success: Green for success states
 * - warning: Orange for warning states
 * - error: Red for error states
 * - info: Blue for info states
 * - primary: Dark background
 * 
 * Sizes: sm, md, lg
 */

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center font-medium rounded-md';
  
  // Variant styles
  const variants = {
    default: 'bg-[#F5F5F5] text-[#666666]',
    success: 'bg-[#DCFCE7] text-[#16A34A]',
    warning: 'bg-[#FED7AA] text-[#EA580C]',
    error: 'bg-[#FEE2E2] text-[#DC2626]',
    info: 'bg-[#DBEAFE] text-[#0284C7]',
    primary: 'bg-[#0F172A] text-white',
  };
  
  // Size styles
  const sizes = {
    sm: 'h-5 px-2 text-[10px] gap-1',
    md: 'h-6 px-2.5 text-xs gap-1.5',
    lg: 'h-7 px-3 text-sm gap-2',
  };
  
  // Dot colors
  const dotColors = {
    default: 'bg-[#999999]',
    success: 'bg-[#16A34A]',
    warning: 'bg-[#EA580C]',
    error: 'bg-[#DC2626]',
    info: 'bg-[#0284C7]',
    primary: 'bg-white',
  };
  
  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
};

export default Badge;
