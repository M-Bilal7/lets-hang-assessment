export const generateEventId = (): string => {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const generateModuleId = (type: string): string => {
  return `${type}_${Date.now()}`;
};

export const generateLinkId = (): string => {
  return `link_${Date.now()}`;
};