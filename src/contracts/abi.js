/**
 * ERC20 Token Contract ABI
 * Includes standard ERC20 functions + minting, pausing, and role management
 */

export const ERC20_ABI = [
  // Read Functions
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  
  // Write Functions
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  
  // Minting Functions
  'function mint(address to, uint256 amount)',
  
  // Pausable Functions
  'function pause()',
  'function unpause()',
  'function paused() view returns (bool)',
  
  // Role Management
  'function hasRole(bytes32 role, address account) view returns (bool)',
  'function grantRole(bytes32 role, address account)',
  'function revokeRole(bytes32 role, address account)',
  'function renounceRole(bytes32 role, address account)',
  
  // Role Constants
  'function DEFAULT_ADMIN_ROLE() view returns (bytes32)',
  'function MINTER_ROLE() view returns (bytes32)',
  
  // Events
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event Paused(address account)',
  'event Unpaused(address account)',
  'event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)',
  'event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)',
];
