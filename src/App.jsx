import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WalletProvider } from './hooks/useWallet';
import { ToastProvider } from './hooks/useToast';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { ToastContainer } from './components/ui/ToastContainer';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { TokenInfoCard } from './components/dashboard/TokenInfoCard';
import { TransferInterface } from './components/dashboard/TransferInterface';
import { MintingInterface } from './components/dashboard/MintingInterface';
import { AdminControls } from './components/dashboard/AdminControls';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <TokenInfoCard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TransferInterface />
              <MintingInterface />
            </div>
          </motion.div>
        );
      
      case 'transfer':
        return (
          <motion.div
            key="transfer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <TransferInterface />
          </motion.div>
        );
      
      case 'mint':
        return (
          <motion.div
            key="mint"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <MintingInterface />
          </motion.div>
        );
      
      case 'admin':
        return (
          <motion.div
            key="admin"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <AdminControls />
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <WalletProvider>
      <ToastProvider>
        <div className="min-h-screen bg-[#0F0F1A] text-white">
          <AnimatedBackground />
          
          <div className="flex">
            <Sidebar 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
            
            <div className="flex-1 flex flex-col min-h-screen">
              <TopBar />
              
              <main className="flex-1 p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                  <AnimatePresence mode="wait">
                    {renderContent()}
                  </AnimatePresence>
                </div>
              </main>

              {/* Footer */}
              <footer className="glass border-t border-white/10 px-6 py-4 mt-auto">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-white/50">
                  <p>© 2025 Monad Token Manager. Built with ❤️ for Monad Testnet</p>
                  <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-[#06FFA5] transition-colors">Docs</a>
                    <a href="#" className="hover:text-[#06FFA5] transition-colors">GitHub</a>
                    <a href="#" className="hover:text-[#06FFA5] transition-colors">Support</a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
          
          <ToastContainer />
        </div>
      </ToastProvider>
    </WalletProvider>
  );
}

export default App;
