'use client';

import { useState } from 'react';
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { Upload, X } from 'lucide-react';
import { eventDataAtom } from '@/lib/store/atoms';
import { apiClient } from '@/lib/api/client';

export default function FlyerImageEditor() {
  const [_, setEventData] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(eventDataAtom);
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await apiClient.uploadFlyerImage(file);
      // Clear selected background so extracted colors from the flyer take priority
      setEventData(prev => ({ ...prev, flyerImage: response.data.url, backgroundImage: '' }));
      setShowModal(false);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="absolute bottom-6 right-6 bg-white/30 backdrop-blur-sm rounded-full p-3 hover:bg-white/40 transition-all"
      >
        <Upload className="w-5 h-5 text-white" strokeWidth={2.5} />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#7A6B8A] rounded-[24px] p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-bold">Upload Flyer Image</h3>
              <button type="button" onClick={() => setShowModal(false)}>
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="flyer-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="flyer-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-12 h-12 text-white/60" />
                <p className="text-white/80 text-sm">
                  {isUploading ? 'Uploading...' : 'Click to upload image'}
                </p>
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}