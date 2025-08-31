export interface StylePreset {
  name: string;
  style: Record<string, any>;
}

import tokens from '../../tokens.json';

export const boxPresets: StylePreset[] = [
  {
    name: 'Card',
    style: {
      padding: 24,
      borderRadius: tokens.radius.md,
      boxShadow: tokens.shadow.e1,
      background: tokens.color.panel,
    },
  },
  {
    name: 'Pill',
    style: {
      padding: '8px 16px',
      borderRadius: 9999,
      background: tokens.color.accent,
      color: tokens.color.bg,
    },
  },
  {
    name: 'Glass',
    style: {
      padding: 16,
      borderRadius: tokens.radius.md,
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(8px)',
    },
  },
];
