import { NextRequest, NextResponse } from 'next/server';

const availableModules = [
  {
    id: 'capacity',
    type: 'capacity',
    name: 'Capacity',
    description: 'Set maximum attendee capacity',
    icon: '👥',
    config: {
      maxCapacity: 100,
      showRemainingSpots: true,
    },
  },
  {
    id: 'photo_gallery',
    type: 'photo_gallery',
    name: 'Photo Gallery',
    description: 'Add event photos',
    icon: '📸',
    config: {
      maxPhotos: 20,
      allowGuestUploads: false,
    },
  },
  {
    id: 'links',
    type: 'links',
    name: 'Links',
    description: 'Add useful links',
    icon: '🔗',
    config: {
      maxLinks: 5,
    },
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json({
    data: availableModules,
  });
}