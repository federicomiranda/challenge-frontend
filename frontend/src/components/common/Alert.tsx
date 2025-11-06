import type { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  variant?: 'warning' | 'error' | 'info';
}

export function Alert({ children, variant = 'info' }: AlertProps) {
  const variants = {
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
  };

  return (
    <div
      className={`border-l-4 p-4 ${variants[variant]}`}
      role="alert"
    >
      <p className="font-medium">{children}</p>
    </div>
  );
}
