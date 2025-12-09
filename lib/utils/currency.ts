export const formatCurrency = (input: string): string => {
  const digitsOnly = input.replace(/[^\d.]/g, '');
  const parts = digitsOnly.split('.');

  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }

  if (parts[1] && parts[1].length > 2) {
    parts[1] = parts[1].substring(0, 2);
  }

  return parts.join('.');
};