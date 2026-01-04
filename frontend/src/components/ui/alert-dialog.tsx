import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      {children}
    </div>
  );
}

export function AlertDialogContent({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`relative z-50 w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

export function AlertDialogHeader({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`flex flex-col space-y-2 text-center sm:text-left mb-4 ${className}`}>{children}</div>;
}

export function AlertDialogTitle({ className = '', children }: { className?: string; children: ReactNode }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function AlertDialogDescription({ className = '', children }: { className?: string; children: ReactNode }) {
  return <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}>{children}</p>;
}

export function AlertDialogFooter({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4 ${className}`}>{children}</div>;
}

interface AlertDialogActionProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function AlertDialogAction({ onClick, disabled, className = '', children }: AlertDialogActionProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}

export function AlertDialogCancel({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 mt-2 sm:mt-0 ${className}`}
    >
      {children}
    </button>
  );
}
