import { NextRequest, NextResponse } from 'next/server';

// Mock storage
const eventModulesDB = new Map<string, any[]>();

interface RouteParams {
  params: Promise<{
    id: string;
    moduleId: string;
  }>;
}

function getModuleData(id: string, moduleId: string) {
  const modules = eventModulesDB.get(id) || [];
  const moduleIndex = modules.findIndex((m) => m.id === moduleId);

  if (moduleIndex === -1) {
    return {
      errorResponse: NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      ),
      modules: null,
      moduleIndex: -1
    };
  }

  return {
    errorResponse: null,
    modules,
    moduleIndex
  };
}

export async function DELETE({ params }: RouteParams) {
  const { id, moduleId } = await params;

  const { errorResponse, modules, moduleIndex } = getModuleData(id, moduleId);
  if (errorResponse) return errorResponse;

  const updatedModules = modules!.filter((m) => m.id !== moduleId);
  eventModulesDB.set(id, updatedModules);

  return NextResponse.json({
    message: 'Module removed successfully',
  });
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id, moduleId } = await params;

    const { errorResponse, modules, moduleIndex } = getModuleData(id, moduleId);
    if (errorResponse) return errorResponse;

    const body = await request.json();

    const updatedModule = {
      ...modules![moduleIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    modules![moduleIndex] = updatedModule;
    eventModulesDB.set(id, modules!);

    return NextResponse.json({
      data: updatedModule,
      message: 'Module updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad request' },
      { status: 400 }
    );
  }
}
