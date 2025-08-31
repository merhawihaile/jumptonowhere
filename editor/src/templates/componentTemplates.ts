export interface ComponentTemplate {
  id: string;
  name: string;
  html: string;
}

const gradients: [string, string][] = [
  ['#ff9a9e', '#fad0c4'],
  ['#a18cd1', '#fbc2eb'],
  ['#ffecd2', '#fcb69f'],
  ['#cfd9df', '#e2ebf0'],
  ['#a1c4fd', '#c2e9fb'],
  ['#d4fc79', '#96e6a1'],
  ['#84fab0', '#8fd3f4'],
  ['#fccb90', '#d57eeb'],
  ['#e0c3fc', '#8ec5fc'],
  ['#f093fb', '#f5576c'],
];

const radii = [8, 12, 16, 20, 24, 28, 32, 40, 48, 64];

export const componentTemplates: ComponentTemplate[] = Array.from(
  { length: 100 },
  (_, i) => {
    const [c1, c2] = gradients[i % gradients.length];
    const radius = radii[Math.floor(i / gradients.length) % radii.length];
    return {
      id: `template-${i + 1}`,
      name: `Template ${i + 1}`,
      html: `<section class=\"p-8 text-ink\" style=\"background:linear-gradient(135deg, ${c1}, ${c2}); border-radius:${radius}px;\"><h2 class=\"text-2xl mb-2\">Template ${i + 1}</h2><p class=\"opacity-80\">Modern section ${i + 1}</p></section>`,
    };
  },
);
