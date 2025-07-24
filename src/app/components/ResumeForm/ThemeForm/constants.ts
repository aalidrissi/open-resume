// DXC Theme Colors
export const DXC_PURPLE = "#6B46C1"; // DXC Standard purple
export const DXC_GREEN = "#059669"; // DXC CDG green

export type DXCMode = typeof DXC_MODES[keyof typeof DXC_MODES];
export const DXC_MODES = {
  STANDARD: 'standard',
  CDG: 'cdg'
} as const;