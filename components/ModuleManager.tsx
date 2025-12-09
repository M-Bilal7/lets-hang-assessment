'use client';

import { useState } from 'react';
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { Plus, X } from 'lucide-react';
import { selectedModulesAtom, EventModule } from '@/lib/store/atoms';

const moduleConfigs = {
  capacity: { icon: '👥', label: 'Capacity', color: 'bg-blue-500/20', primary: true },
  photo_gallery: { icon: '📸', label: 'Photo gallery', color: 'bg-purple-500/20', primary: true },
  links: { icon: '🔗', label: 'Links', color: 'bg-green-500/20', primary: true },
  announcements: { icon: '📢', label: 'Announcements', color: 'bg-yellow-500/20', primary: false },
  privacy: { icon: '🔒', label: 'Privacy', color: 'bg-red-500/20', primary: false },
};

export default function ModuleManager() {
  const [selectedModules, setSelectedModules] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(selectedModulesAtom);
  const [showMore, setShowMore] = useState(false);

  const toggleModule = async (moduleType: keyof typeof moduleConfigs) => {
    const exists = selectedModules.find(m => m.type === moduleType);

    if (exists) {
      setSelectedModules(prev => prev.filter(m => m.type !== moduleType));
    } else {
      const newModule: EventModule = {
        id: `${moduleType}_${Date.now()}`,
        type: moduleType as any,
        config: {},
        data: moduleType === 'links' ? { links: [] } : undefined,
      };

      try {
        setSelectedModules(prev => [...prev, newModule]);
      } catch (error) {
        console.error('Failed to add module:', error);
      }
    }
  };

  const primaryModules = Object.entries(moduleConfigs).filter(([_, config]) => config.primary);
  const secondaryModules = Object.entries(moduleConfigs).filter(([_, config]) => !config.primary);

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      {primaryModules.map(([type, config]) => {
        const isSelected = selectedModules.some(m => m.type === type);

        return (
          <button
            key={type}
            type="button"
            onClick={() => toggleModule(type as keyof typeof moduleConfigs)}
            className={`${isSelected ? 'bg-[#6A5A8A]/80' : 'bg-[#8A7A9A]/60'} backdrop-blur-sm rounded-full px-4 py-2.5 text-white text-[13px] font-semibold flex items-center gap-2 hover:bg-[#8A7A9A]/80 transition-all shadow-md`}
          >
            {isSelected ? (
              <X className="w-3.5 h-3.5" strokeWidth={2.5} />
            ) : (
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            )}
            {config.label}
          </button>
        );
      })}

      {showMore && secondaryModules.map(([type, config]) => {
        const isSelected = selectedModules.some(m => m.type === type);

        return (
          <button
            key={type}
            type="button"
            onClick={() => toggleModule(type as keyof typeof moduleConfigs)}
            className={`${isSelected ? 'bg-[#6A5A8A]/80' : 'bg-[#8A7A9A]/60'} backdrop-blur-sm rounded-full px-4 py-2.5 text-white text-[13px] font-semibold flex items-center gap-2 hover:bg-[#8A7A9A]/80 transition-all shadow-md`}
          >
            {isSelected ? (
              <X className="w-3.5 h-3.5" strokeWidth={2.5} />
            ) : (
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            )}
            {config.label}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => setShowMore(!showMore)}
        className="text-white/35 text-[13px] font-semibold px-4 py-2.5 hover:text-white/55 transition-all"
      >
        {showMore ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
}