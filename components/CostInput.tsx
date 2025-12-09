import { forwardRef } from 'react';

interface CostInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const CostInput = forwardRef<HTMLInputElement, CostInputProps>(
  ({ value, onChange, error }, ref) => {
    const formatCurrency = (input: string): string => {
      const digitsOnly = input.replace(/[^\d.]/g, '');
      const parts = digitsOnly.split('.');

      if (parts.length > 2) {
        return parts[0] + '.' + parts.slice(1).join('');
      }

      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].substring(0, 2);
      }

      return parts.join('.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatCurrency(e.target.value);
      onChange(formatted);
    };

    const displayValue = value ? `$${value}` : '';

    return (
      <div className="p-3.5 flex items-center gap-3">
        <span className="text-[18px] flex-shrink-0">💵</span>
        <input
          ref={ref}
          type="text"
          placeholder="Cost per person"
          value={displayValue}
          onChange={handleChange}
          onFocus={(e) => {
            if (e.target.value === '$') {
              onChange('');
            }
          }}
          className="flex-1 bg-transparent text-white placeholder-white/45 outline-none text-[14px]"
        />
      </div>
    );
  }
);

CostInput.displayName = 'CostInput';

export default CostInput;