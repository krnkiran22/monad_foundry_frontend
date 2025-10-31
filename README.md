# Monad Token Manager 🚀# Monad ERC20 Token Manager 🚀# React + Vite

> **Enterprise-grade ERC20 Token Manager for Monad Testnet**A premium, dark-themed web application for managing ERC20 tokens on Monad testnet. Built with React, Vite, Tailwind CSS v4, and Ethers.js.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

A professional, production-ready web application for deploying and managing ERC20 tokens on the Monad testnet. Built with React, Vite, Tailwind CSS v4, and Ethers.js.![Monad Token Manager](https://img.shields.io/badge/Monad-Testnet-7B3FF2?style=for-the-badge)Currently, two official plugins are available:

[![Monad](https://img.shields.io/badge/Monad-Testnet-blue)](https://monad.xyz)![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://react.dev)

[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC?logo=tailwind-css)](https://tailwindcss.com)![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

[![Ethers.js](https://img.shields.io/badge/Ethers-6.15.0-2535A0)](https://ethers.org)

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

![Landing Page](https://via.placeholder.com/1200x600/FAFAFA/1A1A1A?text=Monad+Token+Manager)

## ✨ Features

---

## React Compiler

## ✨ Features

### 🎨 Premium Design

### 🎯 **Token Management**

- ✅ Deploy custom ERC20 tokens- **Handcrafted UI**: Unique, asymmetric layouts with glassmorphism effectsThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- ✅ Mint new tokens (role-based)

- ✅ Transfer tokens- **Monad Theme**: Deep purple/violet gradients (#7B3FF2, #A855F7) with electric cyan (#06FFA5) accents

- ✅ Pause/Unpause transfers (admin only)

- ✅ Real-time balance tracking- **SF Pro Display/Mono**: Premium macOS typography## Expanding the ESLint configuration

### 🔐 **Access Control**- **Animated Background**: Dynamic gradient mesh with floating orbs

- ✅ Role-based permissions (Admin, Minter)

- ✅ Grant and revoke roles- **Micro-interactions**: Smooth animations, hover effects, and transitionsIf you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

- ✅ Secure admin controls

# monad_foundry_frontend

### 💎 **User Experience**

- ✅ Professional, enterprise-grade UI### 🔐 Wallet Integration

- ✅ Light theme (Corporate Minimalism design)

- ✅ Responsive design (mobile, tablet, desktop)- **MetaMask Support**: Seamless wallet connection

- ✅ Real-time transaction notifications- **Network Detection**: Auto-detect and switch to Monad Testnet

- ✅ Comprehensive analytics dashboard- **Real-time Balance**: Auto-refreshing token balance updates

- **Address Management**: Copy-to-clipboard with toast notifications

### 👨‍💻 **Developer Experience**

- ✅ Built with React 19 + Vite 7### 💎 Token Management

- ✅ Tailwind CSS v4 for styling

- ✅ Type-safe contract interactions with Ethers.js- **Token Information**: View name, symbol, decimals, total supply, and your balance

- ✅ Clean, maintainable code architecture- **Transfer Tokens**: Send tokens to any address

- ✅ Reusable component library- **Mint Tokens**: Create new tokens (requires MINTER_ROLE)

- **Admin Controls**: Pause/unpause contract (requires ADMIN_ROLE)

---

### 👥 Role-Based Access

## 🚀 Quick Start

- **Admin Badge**: Visual indicator for admin permissions

### Prerequisites- **Minter Badge**: Visual indicator for minter permissions

- Node.js 18+ and npm/yarn- **Permission Checks**: Automatic role verification

- MetaMask or compatible Web3 wallet- **Conditional UI**: Show/hide features based on roles

- Monad testnet configured in MetaMask

### 📱 Responsive Design

### Installation

- **Desktop**: Multi-column dashboard with sidebar navigation (1920px+)

**1. Clone the repository**- **Tablet**: Stacked columns with hamburger menu (768px-1919px)

```bash- **Mobile**: Single column with optimized touch interactions (375px-767px)

git clone <repository-url>

cd monad_foundry_frontend## 🛠️ Tech Stack

```

- **Frontend**: React 19 + Vite 7

**2. Install dependencies**- **Styling**: Tailwind CSS v4

````bash- **Blockchain**: Ethers.js v6

npm install- **Animations**: Framer Motion

```- **Icons**: Lucide React

- **State Management**: React Context API

**3. Configure environment variables**

```bash## 📋 Prerequisites

cp .env.example .env

```- Node.js 18+ and npm

- MetaMask browser extension

Edit `.env` and add your contract address:- Monad Testnet RPC access

```env

VITE_RPC_URL=https://testnet.monad.xyz## 🚀 Quick Start

VITE_CONTRACT_ADDRESS=0xYourContractAddressHere

```### 1. Clone the Repository



**4. Start the development server**```bash

```bashgit clone <repository-url>

npm run devcd monad_foundry_frontend

````

**5. Open in browser**### 2. Install Dependencies

Navigate to [http://localhost:5173](http://localhost:5173)```bash

npm install

---```

## 📁 Project Structure### 3. Configure Environment Variables

```Create a `.env` file in the root directory:

monad_foundry_frontend/

├── public/```env

│ ├── monadlogo.webp # Monad logoVITE_CONTRACT_ADDRESS=0xYourContractAddress

│ ├── manifest.json # PWA manifestVITE_MONAD_TESTNET_RPC=https://testnet.monad.xyz

│ └── vite.svg # Vite logoVITE_MONAD_CHAIN_ID=10200

├── src/```

│ ├── components/

│ │ ├── layout/ # Layout components**Important**: Replace `0xYourContractAddress` with your deployed ERC20 contract address.

│ │ │ ├── Sidebar.jsx # Navigation sidebar

│ │ │ └── TopBar.jsx # Top navigation bar### 4. Start Development Server

│ │ └── shared/ # Reusable UI components

│ │ ├── Button.jsx # Button component```bash

│ │ ├── Input.jsx # Input componentnpm run dev

│ │ ├── Card.jsx # Card component```

│ │ ├── Badge.jsx # Badge component

│ │ ├── StatCard.jsx # Stats cardThe application will be available at `http://localhost:5173`

│ │ ├── Table.jsx # Data table

│ │ ├── Modal.jsx # Modal dialog### 5. Build for Production

│ │ ├── Alert.jsx # Alert notifications

│ │ ├── Toast.jsx # Toast notifications```bash

│ │ └── LoadingSpinner.jsx# Loading indicatornpm run build

│ ├── contracts/npm run preview

│ │ └── abi.js # ERC20 contract ABI```

│ ├── hooks/

│ │ ├── useWallet.jsx # Wallet connection hook## 📁 Project Structure

│ │ ├── useContract.js # Contract interaction hook

│ │ └── useToast.jsx # Toast notification hook```

│ ├── pages/monad_foundry_frontend/

│ │ ├── LandingPage.jsx # Public landing page├── src/

│ │ └── DashboardPage.jsx # Main dashboard│ ├── components/

│ ├── utils/│ │ ├── dashboard/

│ │ ├── constants.js # App constants│ │ │ ├── TokenInfoCard.jsx

│ │ └── format.js # Formatting utilities│ │ │ ├── TransferInterface.jsx

│ ├── App.jsx # Main app with routing│ │ │ ├── MintingInterface.jsx

│ ├── main.jsx # App entry point│ │ │ └── AdminControls.jsx

│ └── index.css # Global styles│ │ ├── layout/

├── .env.example # Env template│ │ │ ├── Sidebar.jsx

├── package.json # Dependencies│ │ │ ├── TopBar.jsx

└── vite.config.js # Vite config│ │ │ ├── WalletConnect.jsx

````│ │   │   └── NetworkIndicator.jsx

│   │   └── ui/

---│   │       ├── Button.jsx

│   │       ├── Input.jsx

## 🎨 Design System│   │       ├── Card.jsx

│   │       ├── Badge.jsx

### **Corporate Minimalism with Depth**│   │       ├── LoadingSpinner.jsx

│   │       ├── ToastContainer.jsx

A professional, enterprise-grade design language inspired by Stripe, Linear, and Vercel.│   │       └── AnimatedBackground.jsx

│   ├── hooks/

#### 🎨 Color Palette│   │   ├── useWallet.jsx

```css│   │   ├── useContract.js

/* Primary Colors */│   │   ├── useRoleCheck.js

--bg-base: #FAFAFA;          /* Page background */│   │   ├── useTokenBalance.js

--surface: #FFFFFF;          /* Cards/surfaces */│   │   └── useToast.jsx

--text-primary: #1A1A1A;     /* Headings */│   ├── utils/

--text-secondary: #666666;   /* Body text */│   │   ├── format.js

--border: #E5E5E5;           /* Borders */│   │   └── constants.js

│   ├── contracts/

/* Accent Colors */│   │   └── abi.js

--success: #16A34A;          /* Success states */│   ├── App.jsx

--error: #DC2626;            /* Error states */│   ├── main.jsx

--warning: #EA580C;          /* Warnings */│   └── index.css

--info: #0284C7;             /* Info */├── .env

--brand-primary: #0F172A;    /* Brand color */├── .env.example

```├── package.json

├── vite.config.js

#### 📝 Typography└── README.md

- **Font**: Inter (primary), system fonts (fallback)```

- **Scale**: 11px → 12px → 14px → 16px → 18-32px

- **Weights**: 400, 500, 600, 700## 🔑 Smart Contract Requirements



#### 📏 SpacingYour ERC20 contract must implement:

- **Base**: 8px

- **Scale**: 4, 8, 16, 24, 32, 48, 64, 96px```solidity

// Read Functions

---function name() external view returns (string);

function symbol() external view returns (string);

## 🔗 Smart Contract Integrationfunction decimals() external view returns (uint8);

function totalSupply() external view returns (uint256);

### **Required ERC20 Functions**function balanceOf(address account) external view returns (uint256);

```solidityfunction paused() external view returns (bool);

// Read Functionsfunction hasRole(bytes32 role, address account) external view returns (bool);

function name() external view returns (string);

function symbol() external view returns (string);// Write Functions

function decimals() external view returns (uint8);function transfer(address to, uint256 amount) external returns (bool);

function totalSupply() external view returns (uint256);function mint(address to, uint256 amount) external;

function balanceOf(address) external view returns (uint256);function pause() external;

function paused() external view returns (bool);function unpause() external;

function hasRole(bytes32 role, address) external view returns (bool);```



// Write Functions## 🌐 Monad Testnet Setup

function transfer(address to, uint256 amount) external returns (bool);

function mint(address to, uint256 amount) external;Add Monad Testnet to MetaMask:

function pause() external;

function unpause() external;```

function grantRole(bytes32 role, address account) external;Network Name: Monad Testnet

function revokeRole(bytes32 role, address account) external;RPC URL: https://testnet.monad.xyz

```Chain ID: 10200

Currency Symbol: MON

### **Connecting Your Contract**Block Explorer: https://explorer.testnet.monad.xyz

1. Deploy ERC20 contract to Monad testnet```

2. Copy contract address

3. Add to `.env`: `VITE_CONTRACT_ADDRESS=0x...`## 🎯 Usage Guide

4. Restart dev server

### Connecting Your Wallet

---

1. Click "Connect Wallet" in the top-right

## 🛠️ Tech Stack2. Approve the MetaMask connection

3. Switch to Monad Testnet if prompted

| Technology | Version | Purpose |

|------------|---------|---------|### Transferring Tokens

| React | 19.1.1 | UI framework |

| Vite | 7.1.7 | Build tool |1. Navigate to **Transfer** section

| Tailwind CSS | 4.1.16 | Styling |2. Enter recipient address and amount

| Ethers.js | 6.15.0 | Blockchain |3. Click "Transfer Tokens"

| React Router | 7.1.3 | Routing |4. Approve transaction in MetaMask

| Framer Motion | 12.23.24 | Animations |

| Lucide React | 0.552.0 | Icons |### Minting Tokens (Requires MINTER_ROLE)



---1. Navigate to **Mint** section

2. Enter recipient and amount

## 📱 Pages Overview3. Click "Mint Tokens"

4. Approve transaction

### **1. Landing Page** (`/`)

Public page with features, hero section, and how-it-works timeline### Admin Controls (Requires ADMIN_ROLE)



### **2. Dashboard** (`/dashboard`)1. Navigate to **Admin** section

Main authenticated hub with stats, transactions, and quick actions2. Click "Pause" or "Unpause" to control contract



### **Coming Soon:**## 🎨 Design Philosophy

- `/deploy` - Deploy new tokens

- `/token/:address` - Token details & managementPremium, handcrafted design inspired by Uniswap, Rainbow Wallet, and Phantom:

- `/admin` - Admin panel with analytics

- Asymmetric layouts with intentional white space

---- Glassmorphism effects with subtle borders

- Bold typography (72px+ headers)

## 🚦 Scripts- Smooth Framer Motion animations

- Contextual color system

```bash

npm run dev       # Start dev server## 🐛 Troubleshooting

npm run build     # Build for production

npm run preview   # Preview build### Wallet Connection Issues

npm run lint      # Run linter

```- Ensure MetaMask is installed and unlocked

- Verify you're on Monad Testnet (Chain ID: 10200)

---

### Contract Interaction Errors

## 🔐 Security

- Check contract address in `.env`

- ✅ Role-based access control- Ensure sufficient MON for gas

- ✅ Secure wallet connections- Verify contract is not paused

- ✅ Transaction confirmations

- ✅ No private keys stored## 📝 License

- ✅ Environment variables for config

MIT License

---

## 🤝 Contributing

## 🌐 Browser Support

Contributions welcome! Please submit a Pull Request.

- Chrome 90+

- Firefox 88+---

- Safari 14+

- Edge 90+**Built with ❤️ for the Monad ecosystem**


Requires MetaMask or compatible Web3 wallet.

---

## 📝 License

MIT License

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 💬 Support

- Open an issue on GitHub
- Contact Monad community

---

## 🎉 Acknowledgments

Built for the Monad ecosystem. Design inspired by Stripe, Linear, and Vercel.

---

**Made with ❤️ for the Monad Community**
````
