import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, Info, X } from 'lucide-react';

/**
 * Alert Component
 * For displaying important messages
 * 
 * Variants: success, warning, error, info
 */

const Alert = ({
  variant = 'info',
  title,
  message,
  onClose,
  className = '',
}) => {
  const config = {
    success: {
      bg: 'bg-[#DCFCE7]',
      border: 'border-[#16A34A]/20',
      text: 'text-[#16A34A]',
      icon: CheckCircle2,
    },
    warning: {
      bg: 'bg-[#FED7AA]',
      border: 'border-[#EA580C]/20',
      text: 'text-[#EA580C]',
      icon: AlertCircle,
    },
    error: {
      bg: 'bg-[#FEE2E2]',
      border: 'border-[#DC2626]/20',
      text: 'text-[#DC2626]',
      icon: XCircle,
    },
    info: {
      bg: 'bg-[#DBEAFE]',
      border: 'border-[#0284C7]/20',
      text: 'text-[#0284C7]',
      icon: Info,
    },
  };
  
  const { bg, border, text, icon: Icon } = config[variant];
  
  return (
    <div
      className={`
        ${bg} ${border} ${text}
        border rounded-lg p-4
        flex items-start gap-3
        ${className}
      `}
    >
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-semibold mb-1">{title}</h4>
        )}
        {message && (
          <p className="text-sm opacity-90">{message}</p>
        )}
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded hover:bg-black/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
