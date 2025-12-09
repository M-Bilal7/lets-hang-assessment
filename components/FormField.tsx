import { ReactNode } from 'react';

interface FormFieldProps {
  children: ReactNode;
  error?: string;
}

export default function FormField({ children, error }: FormFieldProps) {
  return (
    <div className="space-y-1">
      {children}
      {error && (
        <p className="text-red-400 text-xs px-4 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}