import { useState } from 'react';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (
    file: File,
    uploadFn: (file: File) => Promise<any>
  ): Promise<string | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const response = await uploadFn(file);
      return response.data.url;
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload file');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, error, uploadFile };
};