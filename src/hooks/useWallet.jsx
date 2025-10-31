import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { ethers } from 'ethers';
import { MONAD_TESTNET, WALLET_STATUS } from '../utils/constants';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [status, setStatus] = useState(WALLET_STATUS.DISCONNECTED);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined';
  };

  // Switch to Monad Testnet
  const switchToMonadTestnet = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MONAD_TESTNET.chainId }],
      });
      return true;
    } catch (error) {
      // Chain not added, try to add it
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [MONAD_TESTNET],
          });
          return true;
        } catch (addError) {
          console.error('Failed to add Monad Testnet:', addError);
          return false;
        }
      }
      console.error('Failed to switch network:', error);
      return false;
    }
  };

  // Connect wallet
  const connect = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      alert('Please install MetaMask to use this application');
      return;
    }

    setStatus(WALLET_STATUS.CONNECTING);

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const network = await web3Provider.getNetwork();
      
      // Check if on correct network
      if (Number(network.chainId) !== MONAD_TESTNET.chainIdDecimal) {
        const switched = await switchToMonadTestnet();
        if (!switched) {
          setStatus(WALLET_STATUS.WRONG_NETWORK);
          return;
        }
      }

      const web3Signer = await web3Provider.getSigner();

      setProvider(web3Provider);
      setSigner(web3Signer);
      setAccount(accounts[0]);
      setChainId(Number(network.chainId));
      setStatus(WALLET_STATUS.CONNECTED);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setStatus(WALLET_STATUS.DISCONNECTED);
    }
  }, []);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
    setStatus(WALLET_STATUS.DISCONNECTED);
  }, []);

  // Handle account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnect();
      } else if (accounts[0] !== account) {
        setAccount(accounts[0]);
      }
    };

    const handleChainChanged = (newChainId) => {
      const chainIdNum = parseInt(newChainId, 16);
      setChainId(chainIdNum);
      
      if (chainIdNum !== MONAD_TESTNET.chainIdDecimal) {
        setStatus(WALLET_STATUS.WRONG_NETWORK);
      } else {
        setStatus(WALLET_STATUS.CONNECTED);
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [account, disconnect]);

  // Auto-connect if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      if (isMetaMaskInstalled()) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          if (accounts.length > 0) {
            connect();
          }
        } catch (error) {
          console.error('Auto-connect failed:', error);
        }
      }
    };

    autoConnect();
  }, [connect]);

  const value = {
    status,
    account,
    provider,
    signer,
    chainId,
    isConnected: status === WALLET_STATUS.CONNECTED,
    isWrongNetwork: status === WALLET_STATUS.WRONG_NETWORK,
    connect,
    disconnect,
    switchToMonadTestnet,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
