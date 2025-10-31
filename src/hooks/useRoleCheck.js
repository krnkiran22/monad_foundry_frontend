import { useState, useEffect, useCallback } from 'react';
import { useWallet } from './useWallet';
import { useContract } from './useContract';
import { ROLES } from '../contracts/abi';

export const useRoleCheck = () => {
  const { account, isConnected } = useWallet();
  const { contract } = useContract();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMinter, setIsMinter] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkRoles = useCallback(async () => {
    if (!contract || !account || !isConnected) {
      setIsAdmin(false);
      setIsMinter(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [adminRole, minterRole] = await Promise.all([
        contract.hasRole(ROLES.ADMIN_ROLE, account),
        contract.hasRole(ROLES.MINTER_ROLE, account),
      ]);

      setIsAdmin(adminRole);
      setIsMinter(minterRole);
    } catch (error) {
      console.error('Error checking roles:', error);
      setIsAdmin(false);
      setIsMinter(false);
    } finally {
      setLoading(false);
    }
  }, [contract, account, isConnected]);

  useEffect(() => {
    checkRoles();
  }, [checkRoles]);

  return {
    isAdmin,
    isMinter,
    loading,
    refetch: checkRoles,
  };
};
