export const formatEventDateTime = (date: Date | null): string => {
  if (!date) return '';

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const isValidFutureDate = (date: Date | null): boolean => {
  if (!date) return false;
  return date > new Date();
};