import { motion } from 'framer-motion';
import { Coins, TrendingUp, Users, Activity } from 'lucide-react';
import { Card } from '../ui/Card';
import { LoadingSpinner, SkeletonLoader } from '../ui/LoadingSpinner';
import { Badge } from '../ui/Badge';
import { useContract } from '../../hooks/useContract';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { useWallet } from '../../hooks/useWallet';
import { useRoleCheck } from '../../hooks/useRoleCheck';
import { formatTokenAmount } from '../../utils/format';
import { useState, useEffect } from 'react';

export const TokenInfoCard = () => {
  const { account, isConnected } = useWallet();
  const { getTokenInfo, isPaused } = useContract();
  const { balance, loading: balanceLoading } = useTokenBalance();
  const { isAdmin, isMinter } = useRoleCheck();
  
  const [tokenInfo, setTokenInfo] = useState(null);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const info = await getTokenInfo();
      const pausedStatus = await isPaused();
      setTokenInfo(info);
      setPaused(pausedStatus);
      setLoading(false);
    };

    if (isConnected) {
      fetchData();
    }
  }, [isConnected, getTokenInfo, isPaused]);

  if (!isConnected) {
    return (
      <Card className="text-center py-12">
        <Coins size={48} className="mx-auto mb-4 text-white/30" />
        <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
        <p className="text-white/60">Connect your wallet to view token information</p>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <div className="space-y-4">
          <SkeletonLoader className="h-8 w-48" />
          <SkeletonLoader className="h-24 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <SkeletonLoader className="h-20" count={2} />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card glow className="overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-gradient">
                {tokenInfo?.name || 'Token'}
              </h2>
              <Badge variant="default">{tokenInfo?.symbol || 'TKN'}</Badge>
            </div>
            <div className="flex items-center gap-2">
              {paused && <Badge variant="warning">Paused</Badge>}
              {isAdmin && <Badge variant="admin">Admin</Badge>}
              {isMinter && <Badge variant="minter">Minter</Badge>}
            </div>
          </div>
          <motion.div
            className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#7B3FF2] to-[#A855F7] flex items-center justify-center glow-purple"
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Coins size={32} className="text-white" />
          </motion.div>
        </div>

        {/* Balance Section */}
        <div className="glass rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-[#06FFA5]" />
            <span className="text-sm text-white/60">Your Balance</span>
          </div>
          {balanceLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <motion.div
              className="text-4xl font-bold text-white"
              key={balance}
              initial={{ scale: 1.2, color: '#06FFA5' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ duration: 0.5 }}
            >
              {formatTokenAmount(balance, tokenInfo?.decimals)} {tokenInfo?.symbol}
            </motion.div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-purple-400" />
              <span className="text-xs text-white/60">Total Supply</span>
            </div>
            <div className="text-xl font-bold text-white">
              {formatTokenAmount(tokenInfo?.totalSupply, tokenInfo?.decimals, 0)}
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-cyan-400" />
              <span className="text-xs text-white/60">Decimals</span>
            </div>
            <div className="text-xl font-bold text-white">
              {tokenInfo?.decimals || 18}
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 flex items-center justify-between glass rounded-xl p-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${paused ? 'bg-amber-500' : 'bg-[#06FFA5]'} animate-pulse`} />
            <span className="text-sm text-white/70">
              Contract Status: {paused ? 'Paused' : 'Active'}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
