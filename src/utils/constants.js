// Monad Testnet Configuration
export const MONAD_TESTNET = {
  chainId: `0x${parseInt(import.meta.env.VITE_MONAD_CHAIN_ID || '10200').toString(16)}`,
  chainIdDecimal: parseInt(import.meta.env.VITE_MONAD_CHAIN_ID || '10200'),
  chainName: 'Monad Testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: [import.meta.env.VITE_MONAD_TESTNET_RPC || 'https://testnet.monad.xyz'],
  blockExplorerUrls: ['https://explorer.testnet.monad.xyz'],
};

// Transaction status
export const TX_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Wallet connection status
export const WALLET_STATUS = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  WRONG_NETWORK: 'wrong_network',
};

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};
