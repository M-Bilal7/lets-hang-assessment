import { LinkItem } from '@/lib/types/link';
import { generateLinkId } from './idGenerator';

export const createNewLink = (): LinkItem => {
  return {
    id: generateLinkId(),
    url: '',
    label: '',
  };
};

export const isLinkComplete = (link: LinkItem): boolean => {
  return !!link.url.trim();
};