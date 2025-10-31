/**
 * Application Constants
 * Configuration values for the entire app
 */

// Monad Testnet Configuration
export const MONAD_TESTNET = {
  chainId: import.meta.env.VITE_MONAD_CHAIN_ID ? parseInt(import.meta.env.VITE_MONAD_CHAIN_ID) : 10143,
  name: 'Monad Testnet',
  rpcUrl: import.meta.env.VITE_MONAD_TESTNET_RPC 
    ? (import.meta.env.VITE_MONAD_TESTNET_RPC.startsWith('http') 
        ? import.meta.env.VITE_MONAD_TESTNET_RPC 
        : `https://${import.meta.env.VITE_MONAD_TESTNET_RPC}`)
    : 'https://testnet.monad.xyz',
  blockExplorer: 'https://explorer.monad.xyz',
  nativeCurrency: {
    name: 'Monad',
    symbol: 'MON',
    decimals: 18,
  },
};

// Contract Address
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

// Wallet Connection Status
export const WALLET_STATUS = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ERROR: 'error',
};

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Role Constants
export const ROLES = {
  ADMIN: 'DEFAULT_ADMIN_ROLE',
  MINTER: 'MINTER_ROLE',
};
