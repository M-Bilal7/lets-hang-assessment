'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { X, Check, Image as ImageIcon } from 'lucide-react';
import { eventDataAtom, extractedColorsAtom } from '@/lib/store/atoms';
import { useBackgrounds } from '@/lib/hooks/useBackgrounds';

export default function BackgroundSelector() {
  const [eventData, setEventData] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(eventDataAtom);
  const [extractedColors, setExtractedColors] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(extractedColorsAtom);
  const { backgrounds } = useBackgrounds();
  const [showModal, setShowModal] = useState(false);

  const selectBackground = (bgId: string) => {
    // Clear extracted colors so the selected background takes priority
    setExtractedColors(null);
    // Set the selected background
    setEventData(prev => ({ ...prev, backgroundImage: bgId }));
    setShowModal(false);
  };

  const modalContent = showModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center" style={{ zIndex: 9999 }}>
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
  );

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

      {showModal && typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}