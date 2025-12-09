'use client';

import { useState, useEffect } from 'react';
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { Users } from 'lucide-react';
import { selectedModulesAtom } from '@/lib/store/atoms';

export default function CapacityInput() {
  const [selectedModules, setSelectedModules] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(selectedModulesAtom);
  const capacityModule = selectedModules.find(m => m.type === 'capacity');
  const [capacity, setCapacity] = useState<string>(capacityModule?.data?.capacity || '');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (capacityModule?.data?.capacity) {
      setCapacity(capacityModule.data.capacity.toString());
    }
  }, [capacityModule]);

  const handleCapacityChange = (value: string) => {
    setCapacity(value);

    // Validation
    if (!value) {
      setError('Capacity is required');
      return;
    }

    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue <= 0) {
      setError('Capacity must be a number greater than 0');
      return;
    }

    setError('');

    // Update the module data
    setSelectedModules(prev =>
      prev.map(m =>
        m.type === 'capacity'
          ? { ...m, data: { capacity: numValue } }
          : m
      )
    );
  };

  return (
    <div className="bg-[#6A5A7A]/65 backdrop-blur-sm rounded-[18px] p-4 shadow-lg">
      <div className="flex items-center gap-3">
        <Users className="w-5 h-5 text-white/60" strokeWidth={2.5} />
        <input
          type="number"
          min="1"
          value={capacity}
          onChange={(e) => handleCapacityChange(e.target.value)}
          placeholder="Enter capacity (e.g., 10)"
          className="flex-1 bg-transparent text-white placeholder-white/45 outline-none text-[14px]"
        />
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-2 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}