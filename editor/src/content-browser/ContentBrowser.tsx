import { FC, ChangeEvent, useState } from 'react';
import { componentTemplates } from '../templates/componentTemplates';
import { interactiveFeatures } from '../templates/interactiveFeatures';
import { useEditor } from '../store/EditorContext';

interface PanelProps {
  className?: string;
}

const ContentBrowser: FC<PanelProps> = ({ className = '' }) => {
  const { addTemplate, applyFeature, selectedIds } = useEditor();
  const [selectedTpl, setTpl] = useState('');
  const [selectedFeat, setFeat] = useState('');
  const handleTpl = (e: ChangeEvent<HTMLSelectElement>) => setTpl(e.target.value);
  const handleFeat = (e: ChangeEvent<HTMLSelectElement>) => setFeat(e.target.value);
  const insert = () => {
    const tpl = componentTemplates.find((t) => t.id === selectedTpl);
    if (tpl) addTemplate(tpl);
  };
  const apply = () => {
    const feat = interactiveFeatures.find((f) => f.id === selectedFeat);
    if (feat) applyFeature(feat);
  };
  return (
    <section
      data-testid="content-browser"
      className={`bg-panel p-2 border-t border-panel2 h-full ${className}`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <select aria-label="template" onChange={handleTpl} className="flex-1">
            <option value="">Templates</option>
            {componentTemplates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <button className="px-2 py-1 bg-panel2" onClick={insert} disabled={!selectedTpl}>
            Add
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select aria-label="feature" onChange={handleFeat} className="flex-1">
            <option value="">JS Features</option>
            {interactiveFeatures.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          <button
            className="px-2 py-1 bg-panel2"
            onClick={apply}
            disabled={!selectedFeat || selectedIds.length === 0}
          >
            Apply
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContentBrowser;
