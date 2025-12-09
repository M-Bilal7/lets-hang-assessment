import { MAX_FILE_SIZE } from '@/lib/constants/defaults';
import { ERROR_MESSAGES } from '@/lib/constants/errorMessages';

export const validateImageFile = (file: File | null): string | null => {
  if (!file) {
    return ERROR_MESSAGES.NO_FILE_PROVIDED;
  }

  if (!file.type.startsWith('image/')) {
    return ERROR_MESSAGES.INVALID_FILE_TYPE;
  }

  if (file.size > MAX_FILE_SIZE) {
    return ERROR_MESSAGES.FILE_TOO_LARGE;
  }

  return null;
};