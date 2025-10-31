import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { MONAD_TESTNET } from '../utils/constants';

/**
 * Debug Component
 * Shows current state for troubleshooting
 */

const DebugPanel = () => {
  const { account, chainId, isConnected, isCorrectNetwork } = useWallet();
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'white',
      border: '2px solid #E5E5E5',
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '300px',
      fontSize: '12px',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>
        Debug Info
      </h3>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Connected:</strong> {isConnected ? '✅ Yes' : '❌ No'}
      </div>
      
      {account && (
        <>
          <div style={{ marginBottom: '8px', wordBreak: 'break-all' }}>
            <strong>Account:</strong> {account}
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <strong>Chain ID:</strong> {chainId || 'N/A'}
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <strong>Network OK:</strong> {isCorrectNetwork ? '✅ Yes' : '❌ No'}
          </div>
        </>
      )}
      
      <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E5E5E5' }}>
        <div style={{ marginBottom: '4px' }}>
          <strong>Expected:</strong>
        </div>
        <div style={{ fontSize: '11px', color: '#666' }}>
          Chain ID: {MONAD_TESTNET.chainId}
        </div>
        <div style={{ fontSize: '11px', color: '#666', wordBreak: 'break-all' }}>
          RPC: {MONAD_TESTNET.rpcUrl}
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
