import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Shield,
  Wallet,
  ChevronRight
} from 'lucide-react';

/**
 * Sidebar Navigation Component
 * Professional layout navigation
 */

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      path: '/deploy',
      label: 'Deploy Token',
      icon: <PlusCircle className="w-5 h-5" />,
    },
    {
      path: '/admin',
      label: 'Admin Panel',
      icon: <Shield className="w-5 h-5" />,
    },
  ];
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-9997 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-9998
          w-60 h-screen
          bg-[#FAFAFA] border-r border-[#E5E5E5]
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 px-6 flex items-center gap-3 border-b border-[#E5E5E5]">
            <img src="/monadlogo.webp" alt="Monad" className="w-8 h-8" />
            <h1 className="text-base font-semibold text-[#1A1A1A]">
              Token Manager
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-3 py-6">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => onClose && onClose()}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg
                        text-sm font-medium transition-colors
                        ${isActive 
                          ? 'bg-[#0F172A] text-white' 
                          : 'text-[#666666] hover:bg-white hover:text-[#1A1A1A]'
                        }
                      `}
                    >
                      {item.icon}
                      <span className="flex-1">{item.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Footer - Wallet Info */}
          <div className="px-3 py-4 border-t border-[#E5E5E5]">
            <div className="px-3 py-2 rounded-lg bg-white border border-[#E5E5E5]">
              <div className="flex items-center gap-2 text-xs text-[#666666] mb-1">
                <Wallet className="w-3.5 h-3.5" />
                <span>Connected</span>
              </div>
              <p className="text-xs font-mono text-[#1A1A1A] truncate">
                0x742d...8f9A
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
