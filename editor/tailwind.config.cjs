const tokens = require('./tokens.json');

const spacing = {};
tokens.space.forEach((v, i) => {
  spacing[i] = `${v}px`;
});

module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: tokens.color.bg,
        panel: tokens.color.panel,
        panel2: tokens.color.panel2,
        ink: tokens.color.ink,
        muted: tokens.color.muted,
        accent: tokens.color.accent,
        accent2: tokens.color.accent2,
        success: tokens.color.success,
        warning: tokens.color.warning,
        danger: tokens.color.danger,
      },
      fontFamily: {
        ui: tokens.font.ui.split(',').map((s) => s.trim()),
        mono: tokens.font.mono.split(',').map((s) => s.trim()),
      },
      borderRadius: {
        sm: `${tokens.radius.sm}px`,
        md: `${tokens.radius.md}px`,
        lg: `${tokens.radius.lg}px`,
        xl: `${tokens.radius.xl}px`,
      },
      boxShadow: {
        e1: tokens.shadow.e1,
        e2: tokens.shadow.e2,
      },
      spacing,
    },
  },
  plugins: [],
};
