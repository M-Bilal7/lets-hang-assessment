'use client';

import { useState, useEffect } from 'react';
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { X, Check } from 'lucide-react';
import { Image as ImageIcon } from 'lucide-react';
import { eventDataAtom, extractedColorsAtom } from '@/lib/store/atoms';
import { apiClient } from '@/lib/api/client';

const backgroundGradients = {
  'gradient-1': 'from-[#E47CB8] via-[#A97CE4] to-[#5CB4E4]',
  'gradient-2': 'from-[#FF6B9D] via-[#C76BFF] to-[#6BB6FF]',
  'gradient-3': 'from-[#FFA07A] via-[#DDA0FF] to-[#7ACBFF]',
  'gradient-4': 'from-[#FF8C94] via-[#B88CFF] to-[#8CC4FF]',
};

interface Background {
  id: string;
  name: string;
  gradient: string;
  thumbnail: string;
}

export default function BackgroundSelector() {
  const [eventData, setEventData] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(eventDataAtom);
  const [extractedColors, setExtractedColors] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(extractedColorsAtom);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBackgrounds();
  }, []);

  const loadBackgrounds = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getBackgrounds();
      if (response.data && Array.isArray(response.data)) {
        setBackgrounds(response.data as Background[]);
      }
    } catch (error) {
      console.error('Failed to load backgrounds:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectBackground = (bgId: string) => {
    // Clear extracted colors so the selected background takes priority
    setExtractedColors(null);
    // Set the selected background
    setEventData(prev => ({ ...prev, backgroundImage: bgId }));
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="w-full bg-[#7A6A9A]/60 text-white rounded-[18px] py-3.5 px-6 font-semibold flex items-center justify-center gap-3 hover:bg-[#8A7AAA]/60 transition-all text-[14px]"
      >
        <ImageIcon className="w-4 h-4" strokeWidth={2.5} />
        Change background
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#7A6B8A] rounded-[24px] p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-bold">Choose Background</h3>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => selectBackground(bg.id)}
                  className="relative aspect-video rounded-lg overflow-hidden group"
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br ${bg.gradient || 'from-gray-400 to-gray-600'}`}
                  />
                  {eventData.backgroundImage === bg.id && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-white" strokeWidth={3} />
                    </div>
                  )}
                  <div className="absolute inset-0 border-2 border-white/20 group-hover:border-white/60 transition-all rounded-lg" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}