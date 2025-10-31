import React from 'react';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import { 
  Coins, 
  Shield, 
  Zap, 
  LineChart, 
  Users, 
  Lock,
  CheckCircle2,
  ArrowRight,
  Github,
  Twitter
} from 'lucide-react';

/**
 * Landing Page (Public)
 * First page users see before connecting wallet
 */

const LandingPage = ({ onConnectWallet }) => {
  const features = [
    {
      icon: <Coins className="w-6 h-6" />,
      title: 'Deploy Custom Tokens',
      description: 'Create and deploy ERC20 tokens on Monad testnet with just a few clicks. No coding required.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Audited',
      description: 'Built with industry-standard security practices. Your tokens are protected by battle-tested smart contracts.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Deployment',
      description: 'Deploy your token in seconds. Lightning-fast transactions on the high-performance Monad network.',
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: 'Real-time Analytics',
      description: 'Track your token\'s performance with comprehensive analytics and transaction history.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Role-Based Access',
      description: 'Granular permission controls. Assign admin and minting roles to trusted addresses.',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Pausable Transfers',
      description: 'Emergency controls to pause token transfers when needed. Full admin control at your fingertips.',
    },
  ];
  
  const steps = [
    {
      number: '01',
      title: 'Connect Wallet',
      description: 'Connect your MetaMask or compatible wallet to get started.',
    },
    {
      number: '02',
      title: 'Configure Token',
      description: 'Set your token name, symbol, supply, and other parameters.',
    },
    {
      number: '03',
      title: 'Deploy & Manage',
      description: 'Deploy to Monad testnet and manage minting, transfers, and admin controls.',
    },
  ];
  
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="sticky top-0 z-50 h-20 bg-white border-b border-[#E5E5E5]">
        <div className="container h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/monadlogo.webp" alt="Monad" className="w-10 h-10" />
            <h1 className="text-xl font-semibold text-[#1A1A1A]">
              Token Manager
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://docs.monad.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-[#666666] hover:text-[#1A1A1A] transition-colors hidden sm:block"
            >
              Documentation
            </a>
            <Button 
              variant="primary" 
              onClick={onConnectWallet}
              leftIcon={<Shield className="w-4 h-4" />}
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-24 bg-linear-to-b from-white to-[#FAFAFA]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DCFCE7] text-[#16A34A] text-sm font-medium mb-6">
              <CheckCircle2 className="w-4 h-4" />
              <span>Powered by Monad Testnet</span>
            </div>
            
            <h1 className="text-5xl font-semibold text-[#1A1A1A] mb-6 leading-tight">
              Deploy & Manage ERC20 Tokens
              <br />
              <span className="text-[#666666]">in Minutes</span>
            </h1>
            
            <p className="text-lg text-[#666666] mb-8 leading-relaxed max-w-2xl mx-auto">
              The professional platform for creating, deploying, and managing ERC20 tokens on Monad testnet. 
              Built for developers and teams who demand simplicity without compromising on control.
            </p>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button 
                variant="primary" 
                size="lg"
                onClick={onConnectWallet}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Get Started
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => window.open('https://github.com', '_blank')}
                leftIcon={<Github className="w-5 h-5" />}
              >
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[#1A1A1A] mb-4">
              Everything You Need
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Comprehensive tools to deploy and manage your ERC20 tokens with enterprise-grade features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} padding="lg" hover>
                <div className="w-12 h-12 rounded-lg bg-[#FAFAFA] flex items-center justify-center text-[#1A1A1A] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[#1A1A1A] mb-4">
              How It Works
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Get your ERC20 token deployed in three simple steps
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-[#E5E5E5] hidden lg:block" 
                   style={{ top: '60px' }} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <Card padding="lg" className="relative z-10">
                      <div className="w-16 h-16 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-xl font-semibold mb-4 mx-auto">
                        {step.number}
                      </div>
                      <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2 text-center">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#666666] text-center">
                        {step.description}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="primary" 
              size="lg"
              onClick={onConnectWallet}
            >
              Start Deploying
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-[#FAFAFA] border-t border-[#E5E5E5]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/monadlogo.webp" alt="Monad" className="w-8 h-8" />
              <p className="text-sm text-[#666666]">
                © 2024 Monad Token Manager. Built for Monad Testnet.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#1A1A1A] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#1A1A1A] transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
