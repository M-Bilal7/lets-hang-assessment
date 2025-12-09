import { EventModule } from '@/lib/store/atoms';
import { generateModuleId } from './idGenerator';

export const createNewModule = (
  moduleType: string,
  initialData?: any
): EventModule => {
  return {
    id: generateModuleId(moduleType),
    type: moduleType as any,
    config: {},
    data: initialData,
  };
};

export const filterModulesByType = (
  modules: EventModule[],
  type: string
): EventModule | undefined => {
  return modules.find(m => m.type === type);
};