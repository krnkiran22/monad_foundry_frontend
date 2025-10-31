import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useContract } from '../../hooks/useContract';
import { useWallet } from '../../hooks/useWallet';
import { useToast } from '../../hooks/useToast';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { parseTokenAmount, isValidAddress } from '../../utils/format';
import { TX_STATUS } from '../../utils/constants';

export const TransferInterface = () => {
  const { isConnected } = useWallet();
  const { transfer, getTokenInfo } = useContract();
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

  const handleTransfer = async () => {
    if (!validate()) return;

    setTxStatus(TX_STATUS.PENDING);
    try {
      const tokenInfo = await getTokenInfo();
      const parsedAmount = parseTokenAmount(amount, tokenInfo.decimals);
      
      const tx = await transfer(recipient, parsedAmount);
      setTxStatus(TX_STATUS.SUCCESS);
      success(`Successfully transferred ${amount} tokens!`);
      
      // Reset form
      setRecipient('');
      setAmount('');
      setErrors({});
      
      // Refresh balance
      refetch();
    } catch (err) {
      setTxStatus(TX_STATUS.ERROR);
      error(err.message || 'Transfer failed. Please try again.');
    } finally {
      setTimeout(() => setTxStatus(TX_STATUS.IDLE), 2000);
    }
  };

  if (!isConnected) {
    return (
      <Card className="text-center py-12">
        <Send size={48} className="mx-auto mb-4 text-white/30" />
        <h3 className="text-xl font-bold text-white mb-2">Connect to Transfer</h3>
        <p className="text-white/60">Connect your wallet to transfer tokens</p>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Send size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Transfer Tokens</h3>
            <p className="text-sm text-white/60">Send tokens to another address</p>
          </div>
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
            label="Amount"
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={errors.amount}
            disabled={txStatus === TX_STATUS.PENDING}
          />

          <Button
            onClick={handleTransfer}
            loading={txStatus === TX_STATUS.PENDING}
            disabled={txStatus === TX_STATUS.PENDING}
            variant="success"
            className="w-full gap-2"
          >
            {txStatus === TX_STATUS.PENDING ? (
              'Processing...'
            ) : (
              <>
                Transfer Tokens
                <ArrowRight size={18} />
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
              ✓ Transfer completed successfully!
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
              ✗ Transfer failed. Please try again.
            </p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};
