export const ensureHexColor = (color: string) => {
  // If color is already a valid hex color, return it
  if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
    return color;
  }
  // Otherwise, return a default color
  console.warn(`Invalid color format: ${color}. Using default color.`);
  return "#000000";
};
