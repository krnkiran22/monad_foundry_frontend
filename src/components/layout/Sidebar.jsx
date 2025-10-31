import { motion } from 'framer-motion';
import { Home, Send, Coins, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { icon: Home, label: 'Dashboard', id: 'dashboard' },
  { icon: Send, label: 'Transfer', id: 'transfer' },
  { icon: Coins, label: 'Mint', id: 'mint' },
  { icon: Settings, label: 'Admin', id: 'admin' },
];

export const Sidebar = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 glass p-3 rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed lg:sticky top-0 left-0 h-screen w-70 z-40 glass border-r border-white/10 p-6 lg:translate-x-0 lg:block"
      >
        {/* Logo */}
        <div className="mb-12">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#7B3FF2] to-[#A855F7] flex items-center justify-center glow-purple">
              <span className="text-2xl font-bold">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Monad</h1>
              <p className="text-xs text-white/50">Token Manager</p>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsOpen(false);
                }}
                className={
                  isActive 
                    ? 'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group bg-linear-to-r from-[#7B3FF2] to-[#A855F7] text-white shadow-lg shadow-purple-500/30' 
                    : 'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group text-white/70 hover:bg-white/5 hover:text-white'
                }
                whileHover={{ x: isActive ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="ml-auto w-2 h-2 rounded-full bg-[#06FFA5]"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="glass rounded-xl p-4 border border-[#06FFA5]/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#06FFA5] animate-pulse" />
              <span className="text-xs text-white/70">Network Active</span>
            </div>
            <p className="text-[10px] text-white/50">
              Connected to Monad Testnet
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
