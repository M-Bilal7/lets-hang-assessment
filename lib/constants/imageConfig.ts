export const IMAGE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  SCALE_FACTOR: 0.25, // For color extraction
  DOMINANT_COLOR_COUNT: 4,
  DEFAULT_COLORS: ['#E47CB8', '#A97CE4', '#5CB4E4'],
};