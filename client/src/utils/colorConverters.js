function darkenColor(color, amount = 0.8) {
  // Convert the color to RGB values.
  const rgb = hexToRgb(color);

  // Multiply each RGB value by the amount.
  const darkenedRgb = rgb.map((value) => value * amount);

  // Clamp the RGB values to the range [0, 255].
  const clampedRgb = darkenedRgb.map((value) =>
    Math.min(Math.max(value, 0), 255)
  );

  // Round the RGB values to the nearest integers.
  const roundedRgb = clampedRgb.map((value) => Math.round(value));

  // Convert the RGB values back to a hex color code.
  const darkenedColor = rgbToHex(roundedRgb);

  return darkenedColor;
}

function lightenColor(color, amount = 0.8) {
  // Convert the color to RGB values.
  const rgb = hexToRgb(color);

  // Add each RGB value by the amount.
  const lightenedRgb = rgb.map((value) => value + amount);

  // Clamp the RGB values to the range [0, 255].
  const clampedRgb = lightenedRgb.map((value) =>
    Math.min(Math.max(value, 0), 255)
  );

  // Round the RGB values to the nearest integers.
  const roundedRgb = clampedRgb.map((value) => Math.round(value));

  // Convert the RGB values back to a hex color code.
  const lightenedColor = rgbToHex(roundedRgb);

  return lightenedColor;
}

// Converts a hex color code to RGB values.
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b];
}

// Converts RGB values to a hex color code.
function rgbToHex(rgb) {
  const r = rgb[0].toString(16).padStart(2, '0');
  const g = rgb[1].toString(16).padStart(2, '0');
  const b = rgb[2].toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
}

function rgbaToHex(rgba) {
  let [r, g, b, a] = rgba.match(/\d+/g).map(Number); // extract numbers
  r = r.toString(16).padStart(2, '0');
  g = g.toString(16).padStart(2, '0');
  b = b.toString(16).padStart(2, '0');
  a = Math.round(a * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${r}${g}${b}${a}`;
}

// Check if a color is light => return dark else return white
function isLightColor(hexColor) {
  // Convert hex color to RGB
  let rgb = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
  let r = parseInt(rgb.slice(0, 2), 16);
  let g = parseInt(rgb.slice(2, 4), 16);
  let b = parseInt(rgb.slice(4, 6), 16);

  // Calculate the luminance of the color
  let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white for dark colors and black for light colors
  return luminance > 0.7;
}

export default {
  darkenColor,
  lightenColor,
  isLightColor,
};
