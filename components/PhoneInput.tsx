'use client';

import { Controller } from 'react-hook-form';
import PhoneInputWithCountry from 'react-phone-number-input';
import { Smartphone } from 'lucide-react';
import 'react-phone-number-input/style.css';

interface PhoneInputProps {
  control: any;
  name: string;
  error?: string;
}

export default function PhoneInput({ control, name, error }: PhoneInputProps) {
  return (
    <div className="bg-[#6A5A7A]/65 backdrop-blur-sm rounded-[18px] shadow-lg relative z-10">
      <div className="p-3.5 flex items-center gap-3">
        <Smartphone className="w-4 h-4 text-white/55 flex-shrink-0" strokeWidth={2} />
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <PhoneInputWithCountry
              international
              defaultCountry="US"
              value={value}
              onChange={onChange}
              placeholder="Enter phone number to save the draft"
              className="flex-1 bg-transparent text-white outline-none text-[14px] phone-input-custom"
            />
          )}
        />
        <button
          type="button"
          className="bg-white/15 rounded-full p-1.5 hover:bg-white/25 transition-all flex-shrink-0"
          aria-label="Submit phone number"
        >
          <span className="text-white text-sm leading-none">→</span>
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-xs px-4 pb-2 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}