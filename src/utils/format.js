import { ethers } from 'ethers';

/**
 * Shorten an Ethereum address
 * @param {string} address - Full address
 * @param {number} chars - Number of chars to show on each side
 */
export const shortenAddress = (address, chars = 4) => {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
};

/**
 * Format token amount from wei to readable format
 * @param {string|number} amount - Amount in wei
 * @param {number} decimals - Token decimals
 * @param {number} displayDecimals - Decimals to show
 */
export const formatTokenAmount = (amount, decimals = 18, displayDecimals = 4) => {
  if (!amount) return '0';
  try {
    const formatted = ethers.formatUnits(amount, decimals);
    const num = parseFloat(formatted);
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: displayDecimals,
    });
  } catch (error) {
    return '0';
  }
};

/**
 * Parse token amount from readable format to wei
 * @param {string} amount - Amount to parse
 * @param {number} decimals - Token decimals
 */
export const parseTokenAmount = (amount, decimals = 18) => {
  try {
    return ethers.parseUnits(amount, decimals);
  } catch (error) {
    throw new Error('Invalid amount');
  }
};

/**
 * Format timestamp to readable date
 * @param {number} timestamp - Unix timestamp
 */
export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
};

/**
 * Validate Ethereum address
 * @param {string} address - Address to validate
 */
export const isValidAddress = (address) => {
  return ethers.isAddress(address);
};
