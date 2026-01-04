import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
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

interface DialogContentProps {
  className?: string;
  children: ReactNode;
}

export function DialogContent({ className = '', children }: DialogContentProps) {
  return (
    <div className={`relative z-50 w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

export function DialogHeader({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`flex flex-col space-y-1.5 text-center sm:text-left mb-4 ${className}`}>{children}</div>;
}

export function DialogTitle({ className = '', children }: { className?: string; children: ReactNode }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}
