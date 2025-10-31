import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';

export const Badge = ({
  children,
  variant = 'default',
  icon: Icon,
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-white/10 text-white border-white/20',
    admin: 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border-red-500/30',
    minter: 'bg-gradient-to-r from-[#7B3FF2]/20 to-[#A855F7]/20 text-purple-300 border-purple-500/30',
    success: 'bg-[#06FFA5]/20 text-[#06FFA5] border-[#06FFA5]/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  };

  const icons = {
    admin: Shield,
    minter: Sparkles,
  };

  const DisplayIcon = Icon || icons[variant];

  return (
    <motion.span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 
        rounded-full text-xs font-medium border
        ${variants[variant]} ${className}
      `}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {DisplayIcon && <DisplayIcon size={14} />}
      {children}
    </motion.span>
  );
};
