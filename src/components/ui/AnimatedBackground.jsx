import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient mesh */}
      <div 
        className="absolute inset-0 animated-gradient"
        style={{
          background: `
            radial-gradient(at 0% 0%, rgba(123, 63, 242, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.12) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(6, 255, 165, 0.08) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(123, 63, 242, 0.1) 0px, transparent 50%)
          `
        }}
      />
      
      {/* Animated orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#7B3FF2]/10 blur-[100px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 150, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-[#A855F7]/8 blur-[120px]"
        animate={{
          x: [0, -100, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-0 left-1/2 w-[400px] h-[400px] rounded-full bg-[#06FFA5]/6 blur-[80px]"
        animate={{
          x: [0, -80, 0],
          y: [0, -120, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};
