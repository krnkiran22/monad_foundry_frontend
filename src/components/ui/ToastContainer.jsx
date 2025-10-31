import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { TOAST_TYPES } from '../../utils/constants';

const toastIcons = {
  [TOAST_TYPES.SUCCESS]: CheckCircle,
  [TOAST_TYPES.ERROR]: AlertCircle,
  [TOAST_TYPES.INFO]: Info,
  [TOAST_TYPES.WARNING]: AlertTriangle,
};

const toastStyles = {
  [TOAST_TYPES.SUCCESS]: 'border-[#06FFA5]/50 bg-[#06FFA5]/10',
  [TOAST_TYPES.ERROR]: 'border-red-500/50 bg-red-500/10',
  [TOAST_TYPES.INFO]: 'border-blue-500/50 bg-blue-500/10',
  [TOAST_TYPES.WARNING]: 'border-amber-500/50 bg-amber-500/10',
};

const iconColors = {
  [TOAST_TYPES.SUCCESS]: 'text-[#06FFA5]',
  [TOAST_TYPES.ERROR]: 'text-red-400',
  [TOAST_TYPES.INFO]: 'text-blue-400',
  [TOAST_TYPES.WARNING]: 'text-amber-400',
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              className={`
                glass rounded-2xl p-4 border
                ${toastStyles[toast.type]}
                backdrop-blur-xl flex items-start gap-3
                shadow-lg min-w-[300px]
              `}
            >
              <Icon className={`${iconColors[toast.type]} shrink-0 mt-0.5`} size={20} />
              <p className="text-white text-sm flex-1">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/60 hover:text-white transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
