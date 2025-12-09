import { NextRequest, NextResponse } from 'next/server';

// Mock storage
const eventModulesDB = new Map<string, any[]>();

interface RouteParams {
  params: Promise<{
    id: string;
    moduleId: string;
  }>;
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id, moduleId } = await params;
  const modules = eventModulesDB.get(id) || [];
  const moduleIndex = modules.findIndex(m => m.id === moduleId);

  if (moduleIndex === -1) {
    return NextResponse.json(
      { error: 'Module not found' },
      { status: 404 }
    );
  }

  const updatedModules = modules.filter(m => m.id !== moduleId);
  eventModulesDB.set(id, updatedModules);

  return NextResponse.json({
    message: 'Module removed successfully',
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id, moduleId } = await params;
    const modules = eventModulesDB.get(id) || [];
    const moduleIndex = modules.findIndex(m => m.id === moduleId);

    if (moduleIndex === -1) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const updatedModule = {
      ...modules[moduleIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    modules[moduleIndex] = updatedModule;
    eventModulesDB.set(id, modules);

    return NextResponse.json({
      data: updatedModule,
      message: 'Module updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}