import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import StatCard from '../compo            {/* Demo Data Warning */}
            {isDemoData && (
              <Alert
                variant="warning"
                title="Using Demo Data"
                message="Contract not responding. Displaying sample data for development. Please check your contract address in .env file."
                className="mb-6"
              />
            )}
            
            {/* Stats Grid - Fixed spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">{ard';
import Table from '../components/shared/Table';
import Badge from '../components/shared/Badge';
import Button from '../components/shared/Button';
import Alert from '../components/shared/Alert';
import { 
  Coins, 
  Users, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
  Wallet
} from 'lucide-react';
import { useContract } from '../hooks/useContract';
import { useWallet } from '../hooks/useWallet';
import { formatTokenAmount, formatTimestamp, shortenAddress } from '../utils/format';

/**
 * Dashboard Page
 * Main hub after wallet connection
 */

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoData, setIsDemoData] = useState(false);
  
  const { getTokenInfo } = useContract();
  const { account } = useWallet();
  
  // Mock transaction data - replace with real data from blockchain
  const [transactions] = useState([
    {
      id: 1,
      type: 'mint',
      from: '0x0000000000000000000000000000000000000000',
      to: account,
      amount: '1,000,000',
      hash: '0x1234...5678',
      timestamp: Date.now() - 3600000,
    },
    {
      id: 2,
      type: 'transfer',
      from: account,
      to: '0x742d35Cc6634C0532925a3b844Bc9e7595f8f9A',
      amount: '50,000',
      hash: '0xabcd...ef01',
      timestamp: Date.now() - 7200000,
    },
  ]);
  
  useEffect(() => {
    loadTokenData();
  }, []);
  
  const loadTokenData = async () => {
    setLoading(true);
    try {
      const info = await getTokenInfo();
      setTokenInfo(info);
      setIsDemoData(false);
      console.log('✅ Token info loaded:', info);
    } catch (error) {
      console.error('❌ Failed to load token data:', error);
      console.log('ℹ️ Using demo data for development');
      // Set mock data for development/testing
      setTokenInfo({
        name: 'Demo Token',
        symbol: 'DEMO',
        totalSupply: '1000000',
        decimals: 18,
        balance: '100000',
      });
      setIsDemoData(true);
    } finally {
      setLoading(false);
    }
  };
  
  // Table columns configuration
  const columns = [
    {
      key: 'type',
      label: 'Type',
      width: '100px',
      render: (value) => (
        <Badge variant={value === 'mint' ? 'success' : 'info'}>
          {value === 'mint' ? 'Mint' : 'Transfer'}
        </Badge>
      ),
    },
    {
      key: 'from',
      label: 'From',
      render: (value) => (
        <span className="font-mono text-xs">
          {value === '0x0000000000000000000000000000000000000000' 
            ? 'Contract' 
            : shortenAddress(value)
          }
        </span>
      ),
    },
    {
      key: 'to',
      label: 'To',
      render: (value) => (
        <span className="font-mono text-xs">
          {shortenAddress(value)}
        </span>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          {row.type === 'mint' ? (
            <ArrowUpRight className="w-4 h-4 text-[#16A34A]" />
          ) : (
            <ArrowDownLeft className="w-4 h-4 text-[#0284C7]" />
          )}
          <span className="font-semibold tabular-nums">
            {value} {tokenInfo?.symbol || 'TOK'}
          </span>
        </div>
      ),
    },
    {
      key: 'timestamp',
      label: 'Time',
      render: (value) => (
        <span className="text-[#666666]">
          {formatTimestamp(value)}
        </span>
      ),
    },
    {
      key: 'hash',
      label: 'Tx Hash',
      render: (value) => (
        <a
          href={`https://testnet.monad.xyz/tx/${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#0284C7] hover:underline"
        >
          <span className="font-mono text-xs">{value}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      ),
    },
  ];
  
  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar onMenuToggle={() => setSidebarOpen(true)} />
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">
                Welcome back
              </h1>
              <p className="text-[#666666]">
                Here's an overview of your token activity
              </p>
            </div>
            
            {/* Demo Data Warning */}
            {isDemoData && (
              <Alert
                variant="warning"
                title="Using Demo Data"
                message="Contract not responding. Displaying sample data for development. Please check your contract address in .env file."
                className="mb-6"
              />
            )}
            
            {/* Tailwind Test - Remove this after confirming styles work */}
            <div className="bg-red-500 text-white p-4 rounded-lg mb-6 border-2 border-red-700">
              <strong>Tailwind Test:</strong> If you see this with a red background and white text, Tailwind CSS is working! 
              If not, try hard refresh (Cmd+Shift+R or Ctrl+Shift+R).
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                label="Token Name"
                value={tokenInfo?.name || 'Loading...'}
                icon={<Coins className="w-5 h-5" />}
                loading={loading}
              />
              <StatCard
                label="Total Supply"
                value={formatTokenAmount(tokenInfo?.totalSupply || 0)}
                suffix={` ${tokenInfo?.symbol || ''}`}
                icon={<TrendingUp className="w-5 h-5" />}
                loading={loading}
                animateValue
              />
              <StatCard
                label="Your Balance"
                value={formatTokenAmount(tokenInfo?.balance || 0)}
                suffix={` ${tokenInfo?.symbol || ''}`}
                icon={<Wallet className="w-5 h-5" />}
                loading={loading}
                animateValue
              />
              <StatCard
                label="Transactions"
                value={transactions.length}
                icon={<Activity className="w-5 h-5" />}
                animateValue
              />
            </div>
            
            {/* Recent Transactions */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                    Recent Transactions
                  </h2>
                  <p className="text-sm text-[#666666]">
                    Your latest token activity
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              
              <Table
                columns={columns}
                data={transactions}
                emptyMessage="No transactions yet"
              />
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-white border border-[#E5E5E5]">
                <div className="w-12 h-12 rounded-lg bg-[#DCFCE7] flex items-center justify-center mb-4">
                  <Coins className="w-6 h-6 text-[#16A34A]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Deploy New Token
                </h3>
                <p className="text-sm text-[#666666] mb-4">
                  Create and deploy a new ERC20 token on Monad testnet
                </p>
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </div>
              
              <div className="p-6 rounded-lg bg-white border border-[#E5E5E5]">
                <div className="w-12 h-12 rounded-lg bg-[#DBEAFE] flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#0284C7]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Manage Roles
                </h3>
                <p className="text-sm text-[#666666] mb-4">
                  Assign admin and minting permissions to addresses
                </p>
                <Button variant="secondary" size="sm">
                  Manage Access
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
