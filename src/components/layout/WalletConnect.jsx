import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, X } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { shortenAddress } from '../../utils/format';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const WalletConnect = () => {
  const { status, account, isConnected, isWrongNetwork, connect, disconnect, switchToMonadTestnet } = useWallet();
  const [showModal, setShowModal] = useState(false);

  const handleConnect = async () => {
    await connect();
    setShowModal(false);
  };

  if (isConnected && !isWrongNetwork) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 glass px-4 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-[#06FFA5] animate-pulse" />
          <span className="text-sm font-mono text-white/70">{shortenAddress(account)}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    );
  }

  if (isWrongNetwork) {
    return (
      <Button variant="danger" onClick={switchToMonadTestnet}>
        Switch to Monad
      </Button>
    );
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)} className="gap-2">
        <Wallet size={18} />
        Connect Wallet
      </Button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Connect Wallet</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {status === 'connecting' ? (
                <div className="py-12">
                  <LoadingSpinner text="Connecting..." />
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-white/70 text-sm mb-6">
                    Connect your wallet to interact with the Monad ERC20 token contract.
                  </p>

                  <button
                    onClick={handleConnect}
                    className="w-full glass hover:bg-white/10 rounded-2xl p-6 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <Wallet size={24} className="text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-semibold group-hover:text-[#06FFA5] transition-colors">
                          MetaMask
                        </h3>
                        <p className="text-white/60 text-sm">Connect using MetaMask</p>
                      </div>
                    </div>
                  </button>

                  <div className="mt-6 p-4 glass rounded-xl">
                    <p className="text-white/60 text-xs text-center">
                      By connecting, you agree to our Terms of Service and acknowledge that you have read our Privacy Policy.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
