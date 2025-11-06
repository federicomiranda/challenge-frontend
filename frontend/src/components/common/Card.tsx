import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  alert?: boolean;
}

export function Card({ children, className = '', alert = false }: CardProps) {
  const alertClasses = alert
    ? 'border-red-500 border-2'
    : 'border-gray-200 border';

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${alertClasses} ${className}`}
    >
      {children}
    </div>
  );
}
