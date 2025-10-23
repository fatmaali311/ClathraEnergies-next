// src/utils/colorUtils.js
export const applyTitleColor = (currentColor, apiColor) => {
  if (currentColor === '#ffffff' || currentColor === 'white' || currentColor === 'text-white') {
    return currentColor; // Preserve white color
  }
  return apiColor || currentColor; // Use API color if provided, else keep current
};

export const applySubtitleColor = (currentColor, apiColor) => {
  if (currentColor === '#ffffff' || currentColor === 'white' || currentColor === 'text-white') {
    return currentColor; // Preserve white color
  }
  return apiColor || currentColor; // Use API color if provided, else keep current
};