import { motion } from 'framer-motion';
import { Bell, User } from 'lucide-react';
import { WalletConnect } from './WalletConnect';
import { NetworkIndicator } from './NetworkIndicator';
import { useWallet } from '../../hooks/useWallet';
import { Badge } from '../ui/Badge';
import { useRoleCheck } from '../../hooks/useRoleCheck';

export const TopBar = () => {
  const { isConnected } = useWallet();
  const { isAdmin, isMinter } = useRoleCheck();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass border-b border-white/10 px-6 py-4 sticky top-0 z-30 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white hidden md:block">
            Token Dashboard
          </h2>
          {isConnected && (
            <div className="flex items-center gap-2">
              {isAdmin && <Badge variant="admin">Admin</Badge>}
              {isMinter && <Badge variant="minter">Minter</Badge>}
            </div>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <NetworkIndicator />
          
          {isConnected && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass p-2 rounded-lg hover:bg-white/10 transition-all relative"
            >
              <Bell size={20} className="text-white/70" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#06FFA5] rounded-full" />
            </motion.button>
          )}

          <WalletConnect />
        </div>
      </div>
    </motion.header>
  );
};
