export interface InteractiveFeature {
  id: string;
  name: string;
  style: Record<string, string>;
}

const transforms = [
  'rotate(3deg)',
  'rotate(-3deg)',
  'scale(1.1)',
  'scale(0.9)',
  'translateX(10px)',
  'translateY(10px)',
  'skewX(5deg)',
  'skewY(5deg)',
  'translateX(-10px)',
  'translateY(-10px)',
];

const colors = [
  '#ffadad',
  '#ffd6a5',
  '#fdffb6',
  '#caffbf',
  '#9bf6ff',
  '#a0c4ff',
  '#bdb2ff',
  '#ffc6ff',
  '#fffffc',
  '#d0f4de',
];

export const interactiveFeatures: InteractiveFeature[] = Array.from(
  { length: 100 },
  (_, i) => {
    const transform = transforms[i % transforms.length];
    const color = colors[Math.floor(i / transforms.length) % colors.length];
    return {
      id: `feature-${i + 1}`,
      name: `Feature ${i + 1}`,
      style: {
        transition: 'all 0.3s ease',
        transform,
        boxShadow: `0 0 0 4px ${color}`,
      },
    };
  },
);
