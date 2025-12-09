import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateEventSchema = z.object({
  phoneNumber: z.string().min(1).optional(),
  dateTime: z.string().datetime().optional(),
  location: z.string().min(3).max(100).optional(),
  cost: z.string().min(1).optional(),
  description: z.string().max(500).optional(),
  flyerImage: z.string().optional(),
  backgroundImage: z.string().optional(),
  modules: z.array(z.object({
    id: z.string(),
    type: z.enum(['capacity', 'photo_gallery', 'links', 'custom']),
    config: z.record(z.string(), z.any()),
  })).optional(),
});

const eventsDB = new Map<string, any>();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const event = eventsDB.get(id);

  if (!event) {
    return NextResponse.json(
      { error: 'Event not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: event });
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const event = eventsDB.get(id);

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = updateEventSchema.parse(body);

    const updatedEvent = {
      ...event,
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };

    eventsDB.set(id, updatedEvent);

    return NextResponse.json({
      data: updatedEvent,
      message: 'Event updated successfully',
    });
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

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const event = eventsDB.get(id);

  if (!event) {
    return NextResponse.json(
      { error: 'Event not found' },
      { status: 404 }
    );
  }

  eventsDB.delete(id);

  return NextResponse.json({
    message: 'Event deleted successfully',
  });
}