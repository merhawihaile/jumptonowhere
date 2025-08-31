import type { FC, MouseEvent } from 'react';
import { useEditor } from '../store/EditorContext';
import type { Node } from '../store/EditorContext';

interface PanelProps {
  className?: string;
}

function NodeItem({ node, depth }: { node: Node; depth: number }) {
  const { selectedIds, select } = useEditor();
  const isSelected = selectedIds.includes(node.id);
  const handleClick = (e: MouseEvent) => select(node.id, e.shiftKey || e.metaKey);
  return (
    <div>
      <div
        style={{ paddingLeft: depth * 8 }}
        className={`cursor-pointer ${isSelected ? 'bg-accent text-bg' : ''}`}
        onClick={handleClick}
      >
        {node.name}
      </div>
      {node.children.map((child: any) => (
        <NodeItem key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

const Outliner: FC<PanelProps> = ({ className = '' }) => {
  const { tree } = useEditor();
  return (
    <aside
      data-testid="outliner"
      className={`bg-panel p-2 border-r border-panel2 h-full overflow-auto ${className}`}
    >
      <NodeItem node={tree} depth={0} />
    </aside>
  );
};

export default Outliner;
