import { forwardRef } from 'react';
import { MapPin } from 'lucide-react';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
  ({ value, onChange, error }, ref) => {
    return (
      <div className="p-3.5 flex items-center gap-3 border-b border-white/8">
        <MapPin className="w-4 h-4 text-[#FF6B6B] flex-shrink-0" strokeWidth={2} />
        <input
          ref={ref}
          type="text"
          placeholder="Location"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-white/45 outline-none text-[14px]"
        />
      </div>
    );
  }
);

LocationInput.displayName = 'LocationInput';

export default LocationInput;