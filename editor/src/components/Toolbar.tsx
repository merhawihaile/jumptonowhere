import type { FC } from 'react';
import { useEditor } from '../store/EditorContext';

interface ToolbarProps {
  className?: string;
}

const Toolbar: FC<ToolbarProps> = ({ className = '' }) => {
  const { undo, redo, canUndo, canRedo } = useEditor();
  return (
    <header
      role="banner"
      className={`bg-panel shadow-e1 h-12 flex items-center px-4 gap-2 ${className}`}
    >
      <span className="font-bold mr-4">My Project</span>
      <select
        aria-label="device preset"
        className="bg-panel2 text-ink p-1 rounded"
        defaultValue="Desktop"
      >
        <option>Desktop</option>
        <option>Tablet</option>
        <option>Mobile</option>
      </select>
      <select
        aria-label="zoom level"
        className="bg-panel2 text-ink p-1 rounded ml-2"
        defaultValue="100%"
      >
        <option>200%</option>
        <option>150%</option>
        <option>100%</option>
        <option>75%</option>
        <option>50%</option>
      </select>
      <label className="ml-4 flex items-center gap-1 text-sm">
        <input type="checkbox" aria-label="snap to grid" className="accent-accent" />
        Snap
      </label>
      <input
        aria-label="ai command"
        placeholder="AI Command"
        className="ml-4 flex-1 bg-panel2 rounded px-2 py-1"
      />
      <button
        aria-label="undo"
        onClick={undo}
        disabled={!canUndo}
        className="ml-4 px-2 py-1 bg-panel2 rounded disabled:opacity-50"
      >
        Undo
      </button>
      <button
        aria-label="redo"
        onClick={redo}
        disabled={!canRedo}
        className="px-2 py-1 bg-panel2 rounded disabled:opacity-50"
      >
        Redo
      </button>
      <button aria-label="run tests" className="ml-4 px-2 py-1 bg-panel2 rounded">
        Run
      </button>
      <button
        aria-label="export"
        className="ml-2 px-2 py-1 bg-accent text-bg rounded"
      >
        Export
      </button>
    </header>
  );
};

export default Toolbar;
