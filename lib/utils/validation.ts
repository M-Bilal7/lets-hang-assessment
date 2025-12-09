export const validateCapacity = (value: string): string | null => {
  if (!value) {
    return 'Capacity is required';
  }

  const numValue = parseInt(value, 10);
  if (isNaN(numValue) || numValue <= 0) {
    return 'Capacity must be a number greater than 0';
  }

  return null;
};