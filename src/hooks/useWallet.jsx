import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { MONAD_TESTNET } from '../utils/constants';

/**
 * Wallet Context & Hook
 * Manages wallet connection and network state
 */

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connecting, setConnecting] = useState(false);
  
  useEffect(() => {
    // Check if already connected
    checkConnection();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);
  
  const checkConnection = async () => {
    if (typeof window.ethereum === 'undefined') return;
    
    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();
        
        setProvider(provider);
        setSigner(signer);
        setAccount(await signer.getAddress());
        setChainId(Number(network.chainId));
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };
  
  const connect = async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed');
    }
    
    setConnecting(true);
    
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      
      setProvider(provider);
      setSigner(signer);
      setAccount(address);
      setChainId(Number(network.chainId));
      
      // Switch to Monad testnet if not already
      if (Number(network.chainId) !== MONAD_TESTNET.chainId) {
        await switchToMonadTestnet();
      }
      
      return address;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setConnecting(false);
    }
  };
  
  const disconnect = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
  };
  
  const switchToMonadTestnet = async () => {
    if (typeof window.ethereum === 'undefined') return;
    
    console.log('Attempting to switch to Monad Testnet:', {
      chainId: MONAD_TESTNET.chainId,
      chainIdHex: `0x${MONAD_TESTNET.chainId.toString(16)}`,
      rpcUrl: MONAD_TESTNET.rpcUrl,
      name: MONAD_TESTNET.name,
    });
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${MONAD_TESTNET.chainId.toString(16)}` }],
      });
    } catch (error) {
      console.log('Switch network error:', error);
      
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        try {
          console.log('Adding Monad Testnet to MetaMask...');
          
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${MONAD_TESTNET.chainId.toString(16)}`,
                chainName: MONAD_TESTNET.name,
                nativeCurrency: {
                  name: 'Monad',
                  symbol: 'MON',
                  decimals: 18,
                },
                rpcUrls: [MONAD_TESTNET.rpcUrl],
                blockExplorerUrls: [MONAD_TESTNET.blockExplorer],
              },
            ],
          });
          
          console.log('✅ Monad Testnet added successfully!');
        } catch (addError) {
          console.error('❌ Error adding network:', addError);
          throw addError;
        }
      } else {
        throw error;
      }
    }
  };
  
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnect();
    } else {
      setAccount(accounts[0]);
    }
  };
  
  const handleChainChanged = () => {
    // Reload page on chain change as recommended by MetaMask
    window.location.reload();
  };
  
  const value = {
    account,
    provider,
    signer,
    chainId,
    connecting,
    isConnected: !!account,
    isCorrectNetwork: chainId === MONAD_TESTNET.chainId,
    connect,
    disconnect,
    switchToMonadTestnet,
  };
  
  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export default useWallet;
