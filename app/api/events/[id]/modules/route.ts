import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const moduleSchema = z.object({
  type: z.enum(['capacity', 'photo_gallery', 'links', 'custom']),
  config: z.record(z.string(), z.json()),
});

const eventModulesDB = new Map<string, any[]>();

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  context: RouteContext
) {
  const { id } = await context.params;
  const modules = eventModulesDB.get(id) || [];

  return NextResponse.json({ data: modules });
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validatedData = moduleSchema.parse(body);

    const existingModules = eventModulesDB.get(id) || [];

    const newModule = {
      id: `module_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
      eventId: id,
      ...validatedData,
      createdAt: new Date().toISOString(),
    };

    const updatedModules = [...existingModules, newModule];
    eventModulesDB.set(id, updatedModules);

    return NextResponse.json(
      {
        data: newModule,
        message: 'Module added successfully',
      },
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
      { error: 'Bad request' },
      { status: 400 }
    );
  }
}