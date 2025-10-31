/**
 * Formatting Utilities
 * Helper functions for formatting addresses, numbers, dates, etc.
 */

/**
 * Shorten an Ethereum address
 * Example: 0x742d35Cc6634C0532925a3b844Bc9e7595f8f9A -> 0x742d...8f9A
 */
export const shortenAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return '';
  if (address.length < startChars + endChars) return address;
  
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Format token amount with commas
 * Example: 1000000 -> 1,000,000
 */
export const formatTokenAmount = (amount, decimals = 0) => {
  if (amount === null || amount === undefined) return '0';
  
  const num = Number(amount);
  if (isNaN(num)) return '0';
  
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format timestamp to relative time
 * Example: 3600000 ms ago -> "1 hour ago"
 */
export const formatTimestamp = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (seconds > 0) return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  
  return 'Just now';
};

/**
 * Format timestamp to readable date
 * Example: 1640000000000 -> "Dec 20, 2021"
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format timestamp to readable date and time
 * Example: 1640000000000 -> "Dec 20, 2021 at 3:30 PM"
 */
export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Format number with suffix (K, M, B)
 * Example: 1500 -> "1.5K"
 */
export const formatNumberWithSuffix = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
