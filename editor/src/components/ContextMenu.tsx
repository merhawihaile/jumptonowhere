import type { FC } from 'react';

interface MenuProps {
  x: number;
  y: number;
  onDuplicate: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const ContextMenu: FC<MenuProps> = ({ x, y, onDuplicate, onDelete, onClose }) => {
  return (
    <div
      role="menu"
      className="absolute bg-panel text-ink border border-panel2 rounded shadow-e1"
      style={{ top: y, left: x }}
    >
      <button
        className="block w-full text-left px-3 py-1 hover:bg-panel2"
        onClick={() => {
          onDuplicate();
          onClose();
        }}
      >
        Duplicate
      </button>
      <button
        className="block w-full text-left px-3 py-1 hover:bg-panel2"
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ContextMenu;
