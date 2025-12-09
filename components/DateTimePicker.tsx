'use client';

import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimePickerProps {
  control: any;
  name: string;
  error?: string;
}

export default function DateTimePicker({ control, name, error }: DateTimePickerProps) {
  return (
    <div className="p-3.5 flex items-center gap-3 border-b border-white/8 relative z-50">
      <Calendar className="w-4 h-4 text-white/55 flex-shrink-0" strokeWidth={2} />
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            selected={value}
            onChange={onChange}
            showTimeSelect
            timeIntervals={30}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Date and time"
            className="flex-1 bg-transparent text-white placeholder-white/45 outline-none text-[14px] w-full cursor-pointer"
            calendarClassName="bg-[#7A6B8A] text-white"
            popperClassName="z-[100]"
            popperPlacement="bottom-start"
          />
        )}
      />
    </div>
  );
}