import React from 'react';
import Button from '../shared/Button';
import Badge from '../shared/Badge';
import { Menu, Wallet, LogOut } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { shortenAddress } from '../../utils/format';

/**
 * Top Navigation Bar Component
 * Header for authenticated pages
 */

const TopBar = ({ onMenuToggle }) => {
  const { account, disconnect } = useWallet();
  
  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-[#E5E5E5]">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Left: Menu Toggle (Mobile) */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-[#666666] hover:bg-[#FAFAFA] transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Page Title - will be dynamic */}
          <h2 className="text-lg font-semibold text-[#1A1A1A] hidden sm:block">
            Dashboard
          </h2>
        </div>
        
        {/* Right: Network + Wallet */}
        <div className="flex items-center gap-3">
          {/* Network Badge */}
          <Badge variant="info" dot>
            Monad Testnet
          </Badge>
          
          {/* Wallet Button */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5]">
            <Wallet className="w-4 h-4 text-[#666666]" />
            <span className="text-sm font-medium text-[#1A1A1A] hidden sm:block">
              {shortenAddress(account || '')}
            </span>
            <button
              onClick={disconnect}
              className="p-1 rounded hover:bg-white transition-colors"
              aria-label="Disconnect"
            >
              <LogOut className="w-4 h-4 text-[#666666]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
