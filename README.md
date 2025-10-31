# Monad ERC20 Token Manager 🚀# React + Vite

A premium, dark-themed web application for managing ERC20 tokens on Monad testnet. Built with React, Vite, Tailwind CSS v4, and Ethers.js.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

![Monad Token Manager](https://img.shields.io/badge/Monad-Testnet-7B3FF2?style=for-the-badge)Currently, two official plugins are available:

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)

![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## ✨ Features

## React Compiler

### 🎨 Premium Design

- **Handcrafted UI**: Unique, asymmetric layouts with glassmorphism effectsThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- **Monad Theme**: Deep purple/violet gradients (#7B3FF2, #A855F7) with electric cyan (#06FFA5) accents

- **SF Pro Display/Mono**: Premium macOS typography## Expanding the ESLint configuration

- **Animated Background**: Dynamic gradient mesh with floating orbs

- **Micro-interactions**: Smooth animations, hover effects, and transitionsIf you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# monad_foundry_frontend

### 🔐 Wallet Integration

- **MetaMask Support**: Seamless wallet connection
- **Network Detection**: Auto-detect and switch to Monad Testnet
- **Real-time Balance**: Auto-refreshing token balance updates
- **Address Management**: Copy-to-clipboard with toast notifications

### 💎 Token Management

- **Token Information**: View name, symbol, decimals, total supply, and your balance
- **Transfer Tokens**: Send tokens to any address
- **Mint Tokens**: Create new tokens (requires MINTER_ROLE)
- **Admin Controls**: Pause/unpause contract (requires ADMIN_ROLE)

### 👥 Role-Based Access

- **Admin Badge**: Visual indicator for admin permissions
- **Minter Badge**: Visual indicator for minter permissions
- **Permission Checks**: Automatic role verification
- **Conditional UI**: Show/hide features based on roles

### 📱 Responsive Design

- **Desktop**: Multi-column dashboard with sidebar navigation (1920px+)
- **Tablet**: Stacked columns with hamburger menu (768px-1919px)
- **Mobile**: Single column with optimized touch interactions (375px-767px)

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4
- **Blockchain**: Ethers.js v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API

## 📋 Prerequisites

- Node.js 18+ and npm
- MetaMask browser extension
- Monad Testnet RPC access

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd monad_foundry_frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_CONTRACT_ADDRESS=0xYourContractAddress
VITE_MONAD_TESTNET_RPC=https://testnet.monad.xyz
VITE_MONAD_CHAIN_ID=10200
```

**Important**: Replace `0xYourContractAddress` with your deployed ERC20 contract address.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
monad_foundry_frontend/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── TokenInfoCard.jsx
│   │   │   ├── TransferInterface.jsx
│   │   │   ├── MintingInterface.jsx
│   │   │   └── AdminControls.jsx
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TopBar.jsx
│   │   │   ├── WalletConnect.jsx
│   │   │   └── NetworkIndicator.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Card.jsx
│   │       ├── Badge.jsx
│   │       ├── LoadingSpinner.jsx
│   │       ├── ToastContainer.jsx
│   │       └── AnimatedBackground.jsx
│   ├── hooks/
│   │   ├── useWallet.jsx
│   │   ├── useContract.js
│   │   ├── useRoleCheck.js
│   │   ├── useTokenBalance.js
│   │   └── useToast.jsx
│   ├── utils/
│   │   ├── format.js
│   │   └── constants.js
│   ├── contracts/
│   │   └── abi.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

## 🔑 Smart Contract Requirements

Your ERC20 contract must implement:

```solidity
// Read Functions
function name() external view returns (string);
function symbol() external view returns (string);
function decimals() external view returns (uint8);
function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function paused() external view returns (bool);
function hasRole(bytes32 role, address account) external view returns (bool);

// Write Functions
function transfer(address to, uint256 amount) external returns (bool);
function mint(address to, uint256 amount) external;
function pause() external;
function unpause() external;
```

## 🌐 Monad Testnet Setup

Add Monad Testnet to MetaMask:

```
Network Name: Monad Testnet
RPC URL: https://testnet.monad.xyz
Chain ID: 10200
Currency Symbol: MON
Block Explorer: https://explorer.testnet.monad.xyz
```

## 🎯 Usage Guide

### Connecting Your Wallet

1. Click "Connect Wallet" in the top-right
2. Approve the MetaMask connection
3. Switch to Monad Testnet if prompted

### Transferring Tokens

1. Navigate to **Transfer** section
2. Enter recipient address and amount
3. Click "Transfer Tokens"
4. Approve transaction in MetaMask

### Minting Tokens (Requires MINTER_ROLE)

1. Navigate to **Mint** section
2. Enter recipient and amount
3. Click "Mint Tokens"
4. Approve transaction

### Admin Controls (Requires ADMIN_ROLE)

1. Navigate to **Admin** section
2. Click "Pause" or "Unpause" to control contract

## 🎨 Design Philosophy

Premium, handcrafted design inspired by Uniswap, Rainbow Wallet, and Phantom:

- Asymmetric layouts with intentional white space
- Glassmorphism effects with subtle borders
- Bold typography (72px+ headers)
- Smooth Framer Motion animations
- Contextual color system

## 🐛 Troubleshooting

### Wallet Connection Issues

- Ensure MetaMask is installed and unlocked
- Verify you're on Monad Testnet (Chain ID: 10200)

### Contract Interaction Errors

- Check contract address in `.env`
- Ensure sufficient MON for gas
- Verify contract is not paused

## 📝 License

MIT License

## 🤝 Contributing

Contributions welcome! Please submit a Pull Request.

---

**Built with ❤️ for the Monad ecosystem**
