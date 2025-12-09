'use client';

import { useState } from 'react';
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { Image as ImageIcon, X, Upload } from 'lucide-react';
import { selectedModulesAtom } from '@/lib/store/atoms';
import { apiClient } from '@/lib/api/client';
import Image from 'next/image';

export default function PhotoGalleryInput() {
  const [selectedModules, setSelectedModules] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(selectedModulesAtom);
  const photoModule = selectedModules.find(m => m.type === 'photo_gallery');
  const [isUploading, setIsUploading] = useState(false);
  const images = photoModule?.data?.images || [];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file =>
        apiClient.uploadFlyerImage(file)
      );

      const responses = await Promise.all(uploadPromises);
      const newImages = responses.map(res => res.data.url);

      // Update the module data
      setSelectedModules(prev =>
        prev.map(m =>
          m.type === 'photo_gallery'
            ? { ...m, data: { images: [...(m.data?.images || []), ...newImages] } }
            : m
        )
      );
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload images');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setSelectedModules(prev =>
      prev.map(m =>
        m.type === 'photo_gallery'
          ? { ...m, data: { images: images.filter((_: any, i: number) => i !== indexToRemove) } }
          : m
      )
    );
  };

  return (
    <div className="bg-[#6A5A7A]/65 backdrop-blur-sm rounded-[18px] p-4 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <ImageIcon className="w-5 h-5 text-white/60" strokeWidth={2.5} />
        <span className="text-white/80 text-[14px] font-semibold">Photo Gallery</span>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {images.map((imageUrl: string, index: number) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
              <Image
                src={imageUrl}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
      )}

      <label
        htmlFor="photo-gallery-upload"
        className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg py-3 px-4 cursor-pointer transition-all"
      >
        <input
          type="file"
          id="photo-gallery-upload"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          disabled={isUploading}
          className="hidden"
        />
        <Upload className="w-4 h-4 text-white/70" strokeWidth={2.5} />
        <span className="text-white/70 text-[13px] font-medium">
          {isUploading ? 'Uploading...' : 'Add photos'}
        </span>
      </label>
    </div>
  );
}