import { gradientMap } from '@/lib/constants/gradients';

export const getPageBackgroundStyle = (
  backgroundImage: string,
  extractedColors: string[] | null
): React.CSSProperties | undefined => {
  // First priority: Selected background from BackgroundSelector
  if (backgroundImage && gradientMap[backgroundImage]) {
    return {
      background: gradientMap[backgroundImage],
    };
  }

  // Second priority: Extracted colors from uploaded flyer
  if (extractedColors && extractedColors.length >= 3) {
    return {
      background: `linear-gradient(to bottom right, ${extractedColors[0]}, ${extractedColors[1]}, ${extractedColors[2]}${extractedColors[3] ? `, ${extractedColors[3]}` : ''})`,
    };
  }

  return undefined;
};