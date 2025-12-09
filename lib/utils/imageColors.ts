/**
 * Extracts dominant colors from an image
 */
export async function extractColorsFromImage(imageUrl: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // For local images, don't use crossOrigin to avoid CORS issues
    // Only set crossOrigin for external images
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }

    img.onload = () => {
      console.log('Image loaded successfully:', imageUrl);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Could not get canvas context');
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Use smaller canvas for better performance
      const scaleFactor = 0.25;
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = extractDominantColors(imageData.data);
        console.log('Extracted colors:', colors);
        resolve(colors);
      } catch (error) {
        console.error('Error extracting image data:', error);
        reject(error);
      }
    };

    img.onerror = (error) => {
      console.error('Failed to load image:', imageUrl, error);
      reject(new Error('Failed to load image'));
    };

    console.log('Starting to load image:', imageUrl);
    img.src = imageUrl;
  });
}

/**
 * Extract 3-4 dominant colors from image data
 */
function extractDominantColors(data: Uint8ClampedArray): string[] {
  const colorMap: Map<string, number> = new Map();

  // Sample every 4th pixel for performance
  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Skip transparent pixels
    if (a < 128) continue;

    // Round colors to reduce variations
    const roundedR = Math.round(r / 20) * 20;
    const roundedG = Math.round(g / 20) * 20;
    const roundedB = Math.round(b / 20) * 20;

    const colorKey = `${roundedR},${roundedG},${roundedB}`;
    colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
  }

  // Sort by frequency and get top colors
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([color]) => {
      const [r, g, b] = color.split(',').map(Number);
      return rgbToHex(r, g, b);
    });

  return sortedColors.length >= 3 ? sortedColors : ['#E47CB8', '#A97CE4', '#5CB4E4'];
}

/**
 * Convert RGB to hex color
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Generate a gradient CSS string from colors
 */
export function generateGradientFromColors(colors: string[]): string {
  // For Tailwind, we need to return the actual color values
  // This will be used with inline styles
  return `linear-gradient(to bottom right, ${colors.join(', ')})`;
}