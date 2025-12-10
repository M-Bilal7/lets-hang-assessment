export const generateEventId = (): string => {
  return `event_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
};

export const generateModuleId = (type: string): string => {
  return `${type}_${Date.now()}`;
};

export const generateLinkId = (): string => {
  return `link_${Date.now()}`;
};