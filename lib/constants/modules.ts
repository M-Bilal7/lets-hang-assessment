export const moduleConfigs = {
  capacity: { icon: '👥', label: 'Capacity', color: 'bg-blue-500/20', primary: true },
  photo_gallery: { icon: '📸', label: 'Photo gallery', color: 'bg-purple-500/20', primary: true },
  links: { icon: '🔗', label: 'Links', color: 'bg-green-500/20', primary: true },
  announcements: { icon: '📢', label: 'Announcements', color: 'bg-yellow-500/20', primary: false },
  privacy: { icon: '🔒', label: 'Privacy', color: 'bg-red-500/20', primary: false },
};

export type ModuleType = keyof typeof moduleConfigs;