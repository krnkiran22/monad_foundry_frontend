import { useState, useEffect, useCallback } from 'react';
import { useWallet } from './useWallet';
import { useContract } from './useContract';

export const useTokenBalance = (refreshInterval = 10000) => {
  const { account, isConnected } = useWallet();
  const { getBalance } = useContract();
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(true);

  const fetchBalance = useCallback(async () => {
    if (!account || !isConnected) {
      setBalance('0');
      setLoading(false);
      return;
    }

    try {
      const bal = await getBalance(account);
      setBalance(bal);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('0');
    } finally {
      setLoading(false);
    }
  }, [account, isConnected, getBalance]);

  useEffect(() => {
    fetchBalance();

    // Set up auto-refresh
    if (refreshInterval && isConnected) {
      const interval = setInterval(fetchBalance, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchBalance, refreshInterval, isConnected]);

  return {
    balance,
    loading,
    refetch: fetchBalance,
  };
};
