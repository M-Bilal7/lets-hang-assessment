'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import BackgroundSelector from './BackgroundSelector';
import { useEffect } from 'react';
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { eventDataAtom, extractedColorsAtom } from '@/lib/store/atoms';
import { extractColorsFromImage } from '@/lib/utils/imageColors';
import { backgroundGradients } from '@/lib/constants/gradients';
import { DEFAULT_FLYER_IMAGE } from '@/lib/constants/defaults';

const FlyerImageEditor = dynamic(() => import('./FlyerImageEditor'), {
  ssr: false,
});

export default function InvitationCard() {
  const eventData = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(eventDataAtom);
  const [extractedColors, setExtractedColors] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(extractedColorsAtom);

  const hasCustomFlyer = eventData.flyerImage && eventData.flyerImage !== DEFAULT_FLYER_IMAGE;

  // Extract colors from uploaded flyer
  useEffect(() => {
    console.log('InvitationCard: hasCustomFlyer:', hasCustomFlyer, 'flyerImage:', eventData.flyerImage);
    if (hasCustomFlyer) {
      console.log('InvitationCard: Extracting colors from:', eventData.flyerImage);
      extractColorsFromImage(eventData.flyerImage)
        .then(colors => {
          console.log('InvitationCard: Colors extracted successfully:', colors);
          setExtractedColors(colors);
        })
        .catch(error => {
          console.error('InvitationCard: Failed to extract colors:', error);
          setExtractedColors(null);
        });
    } else {
      console.log('InvitationCard: No custom flyer, clearing extracted colors');
      setExtractedColors(null);
    }
  }, [eventData.flyerImage, hasCustomFlyer, setExtractedColors]);

  // Determine background style - prioritize selected background over extracted colors
  const getBackgroundStyle = () => {
    console.log('InvitationCard: getBackgroundStyle - backgroundImage:', eventData.backgroundImage, 'extractedColors:', extractedColors);

    // First priority: Selected background from BackgroundSelector
    if (eventData.backgroundImage && backgroundGradients[eventData.backgroundImage]) {
      // Use selected gradient with inline styles since Tailwind classes are dynamic
      const gradientClass = backgroundGradients[eventData.backgroundImage];
      console.log('InvitationCard: Using selected background gradient class');
      return {};
    }

    // Second priority: Extracted colors from uploaded flyer
    if (hasCustomFlyer && extractedColors && extractedColors.length >= 3) {
      // Use extracted colors as gradient
      const gradient = `linear-gradient(to bottom right, ${extractedColors[0]}, ${extractedColors[1]}, ${extractedColors[2]}${extractedColors[3] ? `, ${extractedColors[3]}` : ''})`;
      console.log('InvitationCard: Using extracted colors gradient:', gradient);
      return {
        background: gradient,
      };
    }

    console.log('InvitationCard: Using default gradient');
    return {};
  };

  const backgroundClass = eventData.backgroundImage && backgroundGradients[eventData.backgroundImage]
    ? backgroundGradients[eventData.backgroundImage]
    : 'from-[#E47CB8] via-[#A97CE4] to-[#5CB4E4]';

  const backgroundStyle = getBackgroundStyle();
  const hasCustomGradient = Object.keys(backgroundStyle).length > 0;

  console.log('InvitationCard: Render - hasCustomGradient:', hasCustomGradient, 'backgroundStyle:', backgroundStyle);

  // Get gradient overlay style
  const getGradientOverlay = () => {
    if (extractedColors && extractedColors.length >= 3) {
      return `linear-gradient(135deg, ${extractedColors[0]}, ${extractedColors[1]}, ${extractedColors[2]}${extractedColors[3] ? `, ${extractedColors[3]}` : ''})`;
    }
    return null;
  };

  const gradientOverlay = getGradientOverlay();

  return (
    <div className="space-y-5">
      <div
        className={`relative ${!hasCustomGradient ? `bg-gradient-to-br ${backgroundClass}` : ''} rounded-[28px] p-0 w-full aspect-[0.88] shadow-2xl overflow-hidden`}
        style={hasCustomGradient ? backgroundStyle : undefined}
      >
        {hasCustomFlyer ? (
          <>
            {/* Visible gradient border/padding area */}
            {gradientOverlay && (
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: gradientOverlay,
                }}
              >
                <div className="w-full h-full bg-transparent" />
              </div>
            )}

            {/* Image layer with some padding to show gradient border */}
            <div className="absolute inset-0 z-10 rounded-[12px] overflow-hidden">
              <Image
                src={eventData.flyerImage}
                alt="Event flyer"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Upload button */}
            <div className="relative z-30 p-12 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="pointer-events-auto absolute bottom-6 right-6">
                <FlyerImageEditor />
              </div>
            </div>
          </>
        ) : (
          <div className="p-12 flex items-center justify-center h-full">
            <div className="text-center relative z-10">
              <h2 className="text-white text-[110px] font-black leading-[0.88] tracking-tight">
                YOU&apos;RE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#C4A4D8]/60 to-[#A4B8D8]/30">
                  INVITED
                </span>
              </h2>
            </div>
            <div className="absolute bottom-6 right-6">
              <FlyerImageEditor />
            </div>
          </div>
        )}
      </div>

      <BackgroundSelector />
    </div>
  );
}