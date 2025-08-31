import type { FC, ChangeEvent } from 'react';
import { useEditor } from '../store/EditorContext';
import { boxPresets } from '../templates/boxStyles';

interface PanelProps {
  className?: string;
}

const Inspector: FC<PanelProps> = ({ className = '' }) => {
  const { selected, updateStyle } = useEditor();

  const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
    if (selected) updateStyle(selected.id, { background: e.target.value });
  };

  const applyPreset = (e: ChangeEvent<HTMLSelectElement>) => {
    const preset = boxPresets.find((p) => p.name === e.target.value);
    if (preset && selected) updateStyle(selected.id, preset.style);
  };

  return (
    <aside
      data-testid="inspector"
      className={`bg-panel p-2 border-l border-panel2 h-full ${className}`}
    >
      {selected ? (
        <div className="space-y-2">
          <h2 className="font-bold">{selected.name}</h2>
          <label className="block text-sm">
            Background
            <input
              aria-label="background"
              type="color"
              value={selected.style.background || '#000000'}
              onChange={handleColor}
              className="ml-2"
            />
          </label>
          <label className="block text-sm">
            Preset
            <select className="ml-2" onChange={applyPreset} defaultValue="">
              <option value="">None</option>
              {boxPresets.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : (
        <div className="text-muted">No selection</div>
      )}
    </aside>
  );
};

export default Inspector;
