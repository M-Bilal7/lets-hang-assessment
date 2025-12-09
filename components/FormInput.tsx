import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface FormInputProps {
  icon?: LucideIcon;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  iconColor?: string;
  rightButton?: ReactNode;
  emoji?: string;
  hasBorder?: boolean;
}

export default function FormInput({
  icon: Icon,
  placeholder,
  value,
  onChange,
  iconColor = 'text-white/60',
  rightButton,
  emoji,
  hasBorder = false,
}: FormInputProps) {
  const borderClass = hasBorder ? 'border-b border-white/10' : '';

  return (
    <div className={`p-4 flex items-center gap-3 ${borderClass}`}>
      {Icon && <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} strokeWidth={2} />}
      {emoji && <span className="text-[20px] flex-shrink-0">{emoji}</span>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-[15px]"
      />
      {rightButton}
    </div>
  );
}