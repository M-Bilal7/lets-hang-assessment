import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateEventId } from '@/lib/utils/idGenerator';

const eventSchema = z.object({
  phoneNumber: z.string().min(1),
  dateTime: z.string().datetime(),
  location: z.string().min(3).max(100),
  cost: z.string().min(1),
  description: z.string().max(500).optional(),
  modules: z.array(z.object({
    id: z.string(),
    type: z.enum(['capacity', 'photo_gallery', 'links', 'announcements', 'privacy', 'custom']),
    config: z.record(z.string(), z.any()),
  })).optional(),
});

// Mock database
const eventsDB = new Map<string, any>();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (id) {
    const event = eventsDB.get(id);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: event });
  }

  const allEvents = Array.from(eventsDB.values());
  return NextResponse.json({ data: allEvents });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = eventSchema.parse(body);

    const id = generateEventId();
    const event = {
      id,
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    eventsDB.set(id, event);

    return NextResponse.json(
      { data: event, message: 'Event created successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}