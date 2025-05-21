export interface HeadProps {
  /** Skin tone for the face/neck */
  skinColor?: string;
  /** Color for hair styles */
  hairColor?: string;

  /** Primary accessory color (e.g. hijab, hat) */
  accessoryColor?: string;
}

export const defaultHeadColors = {
  skinColor: "#B28B67",
  hairColor: "#191847",
  accessoryColor: "#89C5CC",
} as const;
