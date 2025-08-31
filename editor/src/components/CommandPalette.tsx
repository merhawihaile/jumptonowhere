import { FC, useEffect, useState, ChangeEvent } from 'react';
import { useEditor } from '../store/EditorContext';

interface Command {
  name: string;
  perform: () => void;
}

const CommandPalette: FC = () => {
  const { selectedIds, duplicateNode, deleteNode } = useEditor();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const commands: Command[] = [
    {
      name: 'Duplicate node',
      perform: () => selectedIds.forEach((id) => duplicateNode(id)),
    },
    {
      name: 'Delete node',
      perform: () => selectedIds.forEach((id) => deleteNode(id)),
    },
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const filtered = commands.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/50 flex items-start justify-center p-8"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-panel rounded shadow-e2 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          type="text"
          placeholder="Type a command..."
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="w-full px-3 py-2 bg-panel2 text-ink outline-none"
        />
        <ul>
          {filtered.map((c) => (
            <li key={c.name}>
              <button
                className="w-full text-left px-3 py-2 hover:bg-panel2"
                onClick={() => {
                  c.perform();
                  setOpen(false);
                  setQuery('');
                }}
              >
                {c.name}
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-muted">No results</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CommandPalette;

