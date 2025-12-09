'use client';

import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import InvitationCard from '@/components/InvitationCard';
import EventForm from '@/components/EventForm';
import { extractedColorsAtom, eventDataAtom } from '@/lib/store/atoms';
import { getPageBackgroundStyle } from '@/lib/utils/backgroundHelpers';

export default function EventCreator() {
  const extractedColors = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(extractedColorsAtom);
  const eventData = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(eventDataAtom);

  const pageBackgroundStyle = getPageBackgroundStyle(
    eventData.backgroundImage,
    extractedColors
  );
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