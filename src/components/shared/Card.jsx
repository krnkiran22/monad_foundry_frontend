import React from 'react';

/**
 * Enterprise-grade Card Component
 * Follows Corporate Minimalism design system
 * 
 * Features:
 * - Clean white background
 * - Subtle borders and shadows
 * - Optional hover state
 * - Padding variants
 */

const Card = ({
  children,
  padding = 'md',
  hover = false,
  className = '',
  ...props
}) => {
  // Padding variants
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div
      className={`
        bg-white
        border border-[#E5E5E5]
        rounded-lg
        shadow-[0_1px_2px_rgba(0,0,0,0.05)]
        transition-all duration-200
        ${paddings[padding]}
        ${hover ? 'hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
