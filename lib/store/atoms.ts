import { atom } from 'recoil';

export interface EventData {
  id?: string;
  phoneNumber: string;
  dateTime: Date | null;
  location: string;
  cost: string;
  description: string;
  flyerImage: string;
  backgroundImage: string;
  modules: EventModule[];
}

export interface EventModule {
  id: string;
  type: 'capacity' | 'photo_gallery' | 'links' | 'announcements' | 'privacy' | 'custom';
  config: Record<string, any>;
  component?: string;
  data?: any; // Store module-specific data like capacity number, links array, images array
}

export const eventDataAtom = atom<EventData>({
  key: 'eventData',
  default: {
    phoneNumber: '',
    dateTime: null,
    location: '',
    cost: '',
    description: '',
    flyerImage: '',
    backgroundImage: '',
    modules: [],
  },
});

export const selectedModulesAtom = atom<EventModule[]>({
  key: 'selectedModules',
  default: [],
});

export const availableBackgroundsAtom = atom<string[]>({
  key: 'availableBackgrounds',
});

export const extractedColorsAtom = atom<string[] | null>({
  key: 'extractedColors',
  default: null,
});