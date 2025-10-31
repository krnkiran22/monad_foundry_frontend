import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-white/70 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            <Icon size={20} />
          </div>
        )}
        <motion.input
          ref={ref}
          className={`
            w-full px-4 py-3 ${Icon ? 'pl-12' : ''} 
            bg-white/5 border border-white/10 
            rounded-2xl text-white placeholder-white/30
            focus:outline-none focus:border-[#7B3FF2] focus:bg-white/10
            transition-all duration-300
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#7B3FF2] to-[#A855F7]"
          initial={{ width: 0 }}
          whileFocus={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
