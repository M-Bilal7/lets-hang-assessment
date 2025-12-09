export type ModuleType =
  | 'capacity'
  | 'photo_gallery'
  | 'links'
  | 'announcements'
  | 'privacy'
  | 'custom';

export interface ModuleConfig {
  icon: string;
  label: string;
  color: string;
  primary: boolean;
}