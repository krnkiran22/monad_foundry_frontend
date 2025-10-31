import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hover = true,
  glow = false,
  ...props
}) => {
  return (
    <motion.div
      className={`
        glass rounded-2xl p-6 
        ${hover ? 'hover:border-white/20 hover:bg-white/8' : ''}
        ${glow ? 'glow-purple' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
