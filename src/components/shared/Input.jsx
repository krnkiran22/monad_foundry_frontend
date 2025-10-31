import React, { forwardRef } from 'react';

/**
 * Enterprise-grade Input Component
 * Follows Corporate Minimalism design system
 * 
 * Features:
 * - Label support
 * - Error state with message
 * - Optional icon (left/right)
 * - Helper text
 * - Disabled state
 */

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          {label}
          {props.required && <span className="text-[#DC2626] ml-1">*</span>}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999] pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        {/* Input Field */}
        <input
          ref={ref}
          className={`
            w-full h-10 px-4 text-sm
            bg-white text-[#1A1A1A] placeholder:text-[#999999]
            border rounded-lg
            transition-all duration-200
            focus:outline-none focus:ring-4
            disabled:bg-[#FAFAFA] disabled:text-[#999999] disabled:cursor-not-allowed
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error 
              ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/10' 
              : 'border-[#E5E5E5] hover:border-[#D1D5DB] focus:border-[#0F172A] focus:ring-[#0F172A]/10'
            }
            ${className}
          `}
          {...props}
        />
        
        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999]">
            {rightIcon}
          </div>
        )}
      </div>
      
      {/* Helper Text / Error Message */}
      {(helperText || error) && (
        <p className={`mt-1.5 text-xs ${error ? 'text-[#DC2626]' : 'text-[#666666]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
