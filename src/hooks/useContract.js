import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './useWallet';
import { TOKEN_ABI, CONTRACT_ADDRESS } from '../contracts/abi';

export const useContract = () => {
  const { provider, signer, isConnected } = useWallet();
  const [contract, setContract] = useState(null);
  const [contractWithSigner, setContractWithSigner] = useState(null);

  useEffect(() => {
    if (provider && CONTRACT_ADDRESS) {
      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        TOKEN_ABI,
        provider
      );
      setContract(contractInstance);

      if (signer) {
        const contractWithSignerInstance = contractInstance.connect(signer);
        setContractWithSigner(contractWithSignerInstance);
      }
    }
  }, [provider, signer]);

  // Read token info
  const getTokenInfo = useCallback(async () => {
    if (!contract) return null;
    try {
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.totalSupply(),
      ]);
      return { name, symbol, decimals, totalSupply };
    } catch (error) {
      console.error('Error fetching token info:', error);
      return null;
    }
  }, [contract]);

  // Get balance
  const getBalance = useCallback(async (address) => {
    if (!contract || !address) return '0';
    try {
      const balance = await contract.balanceOf(address);
      return balance.toString();
    } catch (error) {
      console.error('Error fetching balance:', error);
      return '0';
    }
  }, [contract]);

  // Check if paused
  const isPaused = useCallback(async () => {
    if (!contract) return false;
    try {
      return await contract.paused();
    } catch (error) {
      console.error('Error checking pause status:', error);
      return false;
    }
  }, [contract]);

  // Transfer tokens
  const transfer = useCallback(async (to, amount) => {
    if (!contractWithSigner) throw new Error('Wallet not connected');
    try {
      const tx = await contractWithSigner.transfer(to, amount);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Transfer failed:', error);
      throw error;
    }
  }, [contractWithSigner]);

  // Mint tokens (requires MINTER_ROLE)
  const mint = useCallback(async (to, amount) => {
    if (!contractWithSigner) throw new Error('Wallet not connected');
    try {
      const tx = await contractWithSigner.mint(to, amount);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Mint failed:', error);
      throw error;
    }
  }, [contractWithSigner]);

  // Pause contract (requires ADMIN_ROLE)
  const pause = useCallback(async () => {
    if (!contractWithSigner) throw new Error('Wallet not connected');
    try {
      const tx = await contractWithSigner.pause();
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Pause failed:', error);
      throw error;
    }
  }, [contractWithSigner]);

  // Unpause contract (requires ADMIN_ROLE)
  const unpause = useCallback(async () => {
    if (!contractWithSigner) throw new Error('Wallet not connected');
    try {
      const tx = await contractWithSigner.unpause();
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Unpause failed:', error);
      throw error;
    }
  }, [contractWithSigner]);

  return {
    contract,
    contractWithSigner,
    getTokenInfo,
    getBalance,
    isPaused,
    transfer,
    mint,
    pause,
    unpause,
  };
};
