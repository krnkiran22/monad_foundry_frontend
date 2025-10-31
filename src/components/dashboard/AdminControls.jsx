import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Pause, Play, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useContract } from '../../hooks/useContract';
import { useWallet } from '../../hooks/useWallet';
import { useToast } from '../../hooks/useToast';
import { useRoleCheck } from '../../hooks/useRoleCheck';
import { TX_STATUS } from '../../utils/constants';
import { useEffect } from 'react';

export const AdminControls = () => {
  const { isConnected } = useWallet();
  const { pause, unpause, isPaused } = useContract();
  const { isAdmin, loading: roleLoading } = useRoleCheck();
  const { success, error } = useToast();
  
  const [txStatus, setTxStatus] = useState(TX_STATUS.IDLE);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPauseStatus = async () => {
      setLoading(true);
      const status = await isPaused();
      setPaused(status);
      setLoading(false);
    };

    if (isConnected && isAdmin) {
      checkPauseStatus();
    }
  }, [isConnected, isAdmin, isPaused]);

  const handlePause = async () => {
    setTxStatus(TX_STATUS.PENDING);
    try {
      await pause();
      setPaused(true);
      setTxStatus(TX_STATUS.SUCCESS);
      success('Contract paused successfully!');
    } catch (err) {
      setTxStatus(TX_STATUS.ERROR);
      error(err.message || 'Failed to pause contract.');
    } finally {
      setTimeout(() => setTxStatus(TX_STATUS.IDLE), 2000);
    }
  };

  const handleUnpause = async () => {
    setTxStatus(TX_STATUS.PENDING);
    try {
      await unpause();
      setPaused(false);
      setTxStatus(TX_STATUS.SUCCESS);
      success('Contract unpaused successfully!');
    } catch (err) {
      setTxStatus(TX_STATUS.ERROR);
      error(err.message || 'Failed to unpause contract.');
    } finally {
      setTimeout(() => setTxStatus(TX_STATUS.IDLE), 2000);
    }
  };

  if (!isConnected) {
    return (
      <Card className="text-center py-12">
        <Shield size={48} className="mx-auto mb-4 text-white/30" />
        <h3 className="text-xl font-bold text-white mb-2">Connect to Manage</h3>
        <p className="text-white/60">Connect your wallet to access admin controls</p>
      </Card>
    );
  }

  if (roleLoading) {
    return (
      <Card className="text-center py-12">
        <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/60">Checking permissions...</p>
      </Card>
    );
  }

  if (!isAdmin) {
    return (
      <Card className="text-center py-12">
        <Shield size={48} className="mx-auto mb-4 text-white/30" />
        <h3 className="text-xl font-bold text-white mb-2">Admin Role Required</h3>
        <p className="text-white/60">You need the ADMIN_ROLE to access these controls</p>
        <Badge variant="warning" className="mt-4">No Admin Permission</Badge>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border border-red-500/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg shadow-red-500/30">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Admin Controls</h3>
              <p className="text-sm text-white/60">Manage contract state</p>
            </div>
          </div>
          <Badge variant="admin">Admin</Badge>
        </div>

        {/* Contract Status */}
        <div className="glass rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 mb-1">Contract Status</p>
              <div className="flex items-center gap-3">
                <motion.div
                  className={`w-3 h-3 rounded-full ${paused ? 'bg-amber-500' : 'bg-[#06FFA5]'}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-2xl font-bold text-white">
                  {loading ? 'Checking...' : paused ? 'Paused' : 'Active'}
                </span>
              </div>
            </div>
            {!loading && (
              <div className="text-right">
                {paused ? (
                  <Badge variant="warning">Transfers Disabled</Badge>
                ) : (
                  <Badge variant="success">Fully Operational</Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handlePause}
            disabled={paused || txStatus === TX_STATUS.PENDING || loading}
            loading={txStatus === TX_STATUS.PENDING && !paused}
            variant="danger"
            className="gap-2"
          >
            <Pause size={18} />
            Pause
          </Button>

          <Button
            onClick={handleUnpause}
            disabled={!paused || txStatus === TX_STATUS.PENDING || loading}
            loading={txStatus === TX_STATUS.PENDING && paused}
            variant="success"
            className="gap-2"
          >
            <Play size={18} />
            Unpause
          </Button>
        </div>

        {/* Warning Message */}
        <div className="mt-6 glass rounded-xl p-4 border border-amber-500/30">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-white/70">
                <span className="font-semibold text-amber-400">Warning:</span> Pausing the contract will prevent all token transfers. Use this feature responsibly.
              </p>
            </div>
          </div>
        </div>

        {/* Transaction Status */}
        {txStatus === TX_STATUS.SUCCESS && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 glass rounded-xl p-4 border border-[#06FFA5]/30"
          >
            <p className="text-[#06FFA5] text-sm text-center">
              ✓ Operation completed successfully!
            </p>
          </motion.div>
        )}

        {txStatus === TX_STATUS.ERROR && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 glass rounded-xl p-4 border border-red-500/30"
          >
            <p className="text-red-400 text-sm text-center">
              ✗ Operation failed. Please try again.
            </p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};
