import { useWallet } from './useWallet';
import { Contract } from 'ethers';
import { parseEther, formatEther } from 'ethers';
import { ERC20_ABI } from '../contracts/abi';
import { CONTRACT_ADDRESS } from '../utils/constants';

/**
 * Contract Interaction Hook
 * Provides methods to interact with the ERC20 contract
 */

export const useContract = () => {
  const { signer, provider } = useWallet();
  
  const getContract = (needsSigner = false) => {
    if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
      throw new Error('Contract address not configured');
    }
    
    if (needsSigner && !signer) {
      throw new Error('Wallet not connected');
    }
    
    return new Contract(
      CONTRACT_ADDRESS,
      ERC20_ABI,
      needsSigner ? signer : provider
    );
  };
  
  /**
   * Get token information
   */
  const getTokenInfo = async () => {
    try {
      const contract = getContract(false);
      const [name, symbol, totalSupply, decimals] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.totalSupply(),
        contract.decimals(),
      ]);
      
      let balance = '0';
      if (signer) {
        const address = await signer.getAddress();
        balance = await contract.balanceOf(address);
      }
      
      return {
        name,
        symbol,
        totalSupply: formatEther(totalSupply),
        decimals: Number(decimals),
        balance: formatEther(balance),
      };
    } catch (error) {
      console.error('Error getting token info:', error);
      throw error;
    }
  };
  
  /**
   * Transfer tokens
   */
  const transfer = async (to, amount) => {
    try {
      const contract = getContract(true);
      const amountInWei = parseEther(amount.toString());
      const tx = await contract.transfer(to, amountInWei);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error transferring tokens:', error);
      throw error;
    }
  };
  
  /**
   * Mint tokens
   */
  const mint = async (to, amount) => {
    try {
      const contract = getContract(true);
      const amountInWei = parseEther(amount.toString());
      const tx = await contract.mint(to, amountInWei);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error minting tokens:', error);
      throw error;
    }
  };
  
  /**
   * Pause token transfers
   */
  const pause = async () => {
    try {
      const contract = getContract(true);
      const tx = await contract.pause();
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error pausing contract:', error);
      throw error;
    }
  };
  
  /**
   * Unpause token transfers
   */
  const unpause = async () => {
    try {
      const contract = getContract(true);
      const tx = await contract.unpause();
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error unpausing contract:', error);
      throw error;
    }
  };
  
  /**
   * Check if contract is paused
   */
  const checkPauseStatus = async () => {
    try {
      const contract = getContract(false);
      return await contract.paused();
    } catch (error) {
      console.error('Error checking pause status:', error);
      return false;
    }
  };
  
  /**
   * Grant role to address
   */
  const grantRole = async (role, address) => {
    try {
      const contract = getContract(true);
      const tx = await contract.grantRole(role, address);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error granting role:', error);
      throw error;
    }
  };
  
  /**
   * Revoke role from address
   */
  const revokeRole = async (role, address) => {
    try {
      const contract = getContract(true);
      const tx = await contract.revokeRole(role, address);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error revoking role:', error);
      throw error;
    }
  };
  
  /**
   * Check if address has role
   */
  const hasRole = async (role, address) => {
    try {
      const contract = getContract(false);
      return await contract.hasRole(role, address);
    } catch (error) {
      console.error('Error checking role:', error);
      return false;
    }
  };
  
  return {
    getTokenInfo,
    transfer,
    mint,
    pause,
    unpause,
    checkPauseStatus,
    grantRole,
    revokeRole,
    hasRole,
  };
};

export default useContract;
