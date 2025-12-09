'use client';

import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import InvitationCard from '@/components/InvitationCard';
import EventForm from '@/components/EventForm';
import { extractedColorsAtom, eventDataAtom } from '@/lib/store/atoms';

// Map of gradient IDs to their CSS gradient values
const gradientMap: Record<string, string> = {
  'gradient-1': 'linear-gradient(to bottom right, #E47CB8, #A97CE4, #5CB4E4)',
  'gradient-2': 'linear-gradient(to bottom right, #FF6B9D, #C76BFF, #6BB6FF)',
  'gradient-3': 'linear-gradient(to bottom right, #FFA07A, #DDA0FF, #7ACBFF)',
  'gradient-4': 'linear-gradient(to bottom right, #FF8C94, #B88CFF, #8CC4FF)',
};

export default function EventCreator() {
  const extractedColors = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(extractedColorsAtom);
  const eventData = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(eventDataAtom);

  // Generate page background style - prioritize selected background over extracted colors
  const getPageBackgroundStyle = () => {
    // First priority: Selected background from BackgroundSelector
    if (eventData.backgroundImage && gradientMap[eventData.backgroundImage]) {
      return {
        background: gradientMap[eventData.backgroundImage],
      };
    }

    // Second priority: Extracted colors from uploaded flyer
    if (extractedColors && extractedColors.length >= 3) {
      return {
        background: `linear-gradient(to bottom right, ${extractedColors[0]}, ${extractedColors[1]}, ${extractedColors[2]}${extractedColors[3] ? `, ${extractedColors[3]}` : ''})`,
      };
    }

    return undefined;
  };

  const pageBackgroundStyle = getPageBackgroundStyle();
  const hasCustomBackground = !!pageBackgroundStyle;

  return (
    <>
      {/* Fixed background layer that covers everything */}
      <div
        className={`fixed inset-0 -z-10 ${!hasCustomBackground ? 'bg-gradient-to-br from-[#C89DB8] via-[#B89DC8] to-[#98B8D8]' : ''} transition-all duration-500`}
        style={pageBackgroundStyle}
      />

      {/* Content layer */}
      <div className="relative min-h-screen p-8">
        <div className="max-w-[1380px] mx-auto">
          <h1 className="text-white text-[30px] font-semibold mb-9">let&apos;s hang</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            <InvitationCard />
            <EventForm />
          </div>
        </div>
      </div>
    </>
  );
}