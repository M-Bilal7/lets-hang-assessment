export interface APIResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  details?: any;
}

export interface Background {
  id: string;
  name: string;
  gradient: string;
  thumbnail: string;
}