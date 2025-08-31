import type { FC } from 'react';
import { useState } from 'react';
import { useEditor } from '../store/EditorContext';
import type { Node } from '../store/EditorContext';

interface ViewportProps {
  className?: string;
}

function RenderNode({ node, openMenu }: { node: Node; openMenu: (x: number, y: number, id: string) => void }) {
  const { selectedIds, select } = useEditor();
  const isSelected = selectedIds.includes(node.id);
  const style = { ...node.style, outline: isSelected ? '2px solid var(--color-accent)' : undefined };
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    select(node.id, e.shiftKey || e.metaKey);
  };
  const handleContext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    select(node.id);
    openMenu(e.clientX, e.clientY, node.id);
  };
  if (node.content?.html) {
    return (
      <div
        data-testid={node.id}
        style={style}
        onClick={handleClick}
        onContextMenu={handleContext}
        dangerouslySetInnerHTML={{ __html: node.content.html }}
      />
    );
  }
  if (node.type === 'text') {
    return (
      <p
        data-testid={node.id}
        style={style}
        onClick={handleClick}
        onContextMenu={handleContext}
      >
        {node.content?.text || node.name}
      </p>
    );
  }
  return (
    <div
      data-testid={node.id}
      style={style}
      onClick={handleClick}
      onContextMenu={handleContext}
    >
      {node.children.map((c) => (
        <RenderNode key={c.id} node={c} openMenu={openMenu} />
      ))}
    </div>
  );
}

import ContextMenu from '../components/ContextMenu';

const Viewport: FC<ViewportProps> = ({ className = '' }) => {
  const { tree, duplicateNode, deleteNode } = useEditor();
  const [menu, setMenu] = useState<{
    x: number;
    y: number;
    id: string;
  } | null>(null);

  const openMenu = (x: number, y: number, id: string) => setMenu({ x, y, id });
  const closeMenu = () => setMenu(null);

  return (
    <main
      data-testid="viewport"
      className={`relative bg-panel2 flex items-start justify-start p-4 h-full overflow-auto ${className}`}
      onMouseDown={(e) => {
        if (e.button === 0) closeMenu();
      }}
    >
      <RenderNode node={tree} openMenu={openMenu} />
      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onDuplicate={() => duplicateNode(menu.id)}
          onDelete={() => deleteNode(menu.id)}
          onClose={closeMenu}
        />
      )}
    </main>
  );
};

export default Viewport;
