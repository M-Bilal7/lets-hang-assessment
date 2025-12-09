'use client';

import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { selectedModulesAtom } from '@/lib/store/atoms';
import CapacityInput from './CapacityInput';
import PhotoGalleryInput from './PhotoGalleryInput';
import LinksInput from './LinksInput';

export default function ModuleInputs() {
  const selectedModules = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(selectedModulesAtom);

  const hasCapacity = selectedModules.some(m => m.type === 'capacity');
  const hasPhotoGallery = selectedModules.some(m => m.type === 'photo_gallery');
  const hasLinks = selectedModules.some(m => m.type === 'links');

  if (selectedModules.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {hasCapacity && <CapacityInput />}
      {hasPhotoGallery && <PhotoGalleryInput />}
      {hasLinks && <LinksInput />}
    </div>
  );
}