import { motion } from 'framer-motion';
import { Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { MONAD_TESTNET } from '../../utils/constants';

export const NetworkIndicator = () => {
  const { chainId, isConnected, isWrongNetwork } = useWallet();

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2 glass px-3 py-2 rounded-full">
        <div className="w-2 h-2 rounded-full bg-white/30" />
        <span className="text-xs text-white/50">Not Connected</span>
      </div>
    );
  }

  if (isWrongNetwork) {
    return (
      <motion.div
        className="flex items-center gap-2 glass px-3 py-2 rounded-full border border-red-500/30"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AlertCircle size={14} className="text-red-400" />
        <span className="text-xs text-red-400">Wrong Network</span>
      </motion.div>
    );
  }

  return (
    <div className="flex items-center gap-2 glass px-3 py-2 rounded-full border border-[#06FFA5]/30">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Activity size={14} className="text-[#06FFA5]" />
      </motion.div>
      <span className="text-xs text-[#06FFA5] font-medium">
        {MONAD_TESTNET.chainName}
      </span>
      <CheckCircle size={14} className="text-[#06FFA5]" />
    </div>
  );
};
