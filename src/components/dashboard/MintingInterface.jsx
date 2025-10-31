import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useContract } from '../../hooks/useContract';
import { useWallet } from '../../hooks/useWallet';
import { useToast } from '../../hooks/useToast';
import { useRoleCheck } from '../../hooks/useRoleCheck';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { parseTokenAmount, isValidAddress } from '../../utils/format';
import { TX_STATUS } from '../../utils/constants';

export const MintingInterface = () => {
  const { isConnected } = useWallet();
  const { mint, getTokenInfo } = useContract();
  const { isMinter, loading: roleLoading } = useRoleCheck();
  const { success, error } = useToast();
  const { refetch } = useTokenBalance();
  
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [txStatus, setTxStatus] = useState(TX_STATUS.IDLE);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!recipient) {
      newErrors.recipient = 'Recipient address is required';
    } else if (!isValidAddress(recipient)) {
      newErrors.recipient = 'Invalid Ethereum address';
    }

    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMint = async () => {
    if (!validate()) return;

    setTxStatus(TX_STATUS.PENDING);
    try {
      const tokenInfo = await getTokenInfo();
      const parsedAmount = parseTokenAmount(amount, tokenInfo.decimals);
      
      const tx = await mint(recipient, parsedAmount);
      setTxStatus(TX_STATUS.SUCCESS);
      success(`Successfully minted ${amount} tokens!`);
      
      // Reset form
      setRecipient('');
      setAmount('');
      setErrors({});
      
      // Refresh balance
      refetch();
    } catch (err) {
      setTxStatus(TX_STATUS.ERROR);
      error(err.message || 'Minting failed. Please try again.');
    } finally {
      setTimeout(() => setTxStatus(TX_STATUS.IDLE), 2000);
    }
  };

  if (!isConnected) {
    return (
      <Card className="text-center py-12">
        <Sparkles size={48} className="mx-auto mb-4 text-white/30" />
        <h3 className="text-xl font-bold text-white mb-2">Connect to Mint</h3>
        <p className="text-white/60">Connect your wallet to mint tokens</p>
      </Card>
    );
  }

  if (roleLoading) {
    return (
      <Card className="text-center py-12">
        <div className="w-12 h-12 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/60">Checking permissions...</p>
      </Card>
    );
  }

  if (!isMinter) {
    return (
      <Card className="text-center py-12">
        <Sparkles size={48} className="mx-auto mb-4 text-white/30" />
        <h3 className="text-xl font-bold text-white mb-2">Minter Role Required</h3>
        <p className="text-white/60">You need the MINTER_ROLE to mint tokens</p>
        <Badge variant="warning" className="mt-4">No Minting Permission</Badge>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border border-purple-500/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#7B3FF2] to-[#A855F7] flex items-center justify-center glow-purple">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Mint Tokens</h3>
              <p className="text-sm text-white/60">Create new tokens</p>
            </div>
          </div>
          <Badge variant="minter">Minter</Badge>
        </div>

        <div className="space-y-4">
          <Input
            label="Recipient Address"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            error={errors.recipient}
            disabled={txStatus === TX_STATUS.PENDING}
          />

          <Input
            label="Amount to Mint"
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={errors.amount}
            disabled={txStatus === TX_STATUS.PENDING}
          />

          <Button
            onClick={handleMint}
            loading={txStatus === TX_STATUS.PENDING}
            disabled={txStatus === TX_STATUS.PENDING}
            variant="primary"
            className="w-full gap-2"
          >
            {txStatus === TX_STATUS.PENDING ? (
              'Minting...'
            ) : (
              <>
                <Zap size={18} />
                Mint Tokens
              </>
            )}
          </Button>
        </div>

        {/* Transaction Status */}
        {txStatus === TX_STATUS.SUCCESS && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 glass rounded-xl p-4 border border-[#06FFA5]/30"
          >
            <p className="text-[#06FFA5] text-sm text-center">
              ✓ Tokens minted successfully!
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
              ✗ Minting failed. Please try again.
            </p>
          </motion.div>
        )}

        {/* Info Card */}
        <div className="mt-6 glass rounded-xl p-4">
          <div className="flex items-start gap-2">
            <Zap size={16} className="text-purple-400 mt-0.5" />
            <div>
              <p className="text-xs text-white/60">
                Minting creates new tokens and adds them to the total supply. Only accounts with MINTER_ROLE can perform this action.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
