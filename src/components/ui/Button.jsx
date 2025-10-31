import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#7B3FF2] to-[#A855F7] text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95',
    secondary: 'glass border border-white/10 text-white hover:border-white/20 hover:bg-white/5',
    outline: 'border-2 border-[#7B3FF2] text-[#7B3FF2] hover:bg-[#7B3FF2] hover:text-white',
    ghost: 'text-white hover:bg-white/10',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/50',
    success: 'bg-[#06FFA5] text-[#0F0F1A] hover:shadow-lg hover:shadow-[#06FFA5]/50 hover:scale-105 active:scale-95',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};
