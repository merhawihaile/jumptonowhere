import { createContext, useContext, useState, ReactNode } from 'react';

export interface Node {
  id: string;
  name: string;
  type: 'box' | 'text';
  style: Record<string, any>;
  children: Node[];
  content?: { text?: string; html?: string };
}

function findNode(node: Node, id: string): Node | null {
  if (node.id === id) return node;
  for (const child of node.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

function updateNode(node: Node, id: string, updater: (n: Node) => void): Node {
  if (node.id === id) {
    updater(node);
    return node;
  }
  node.children = node.children.map((c) => updateNode(c, id, updater));
  return node;
}

const initialTree: Node = {
  id: 'root',
  name: 'Page',
  type: 'box',
  style: { display: 'flex', gap: 24, padding: 24 },
  children: [
    {
      id: 'hero',
      name: 'Hero',
      type: 'box',
      style: { padding: 32, background: '#1b2430', color: '#e7ecf2' },
      children: [
        {
          id: 'title',
          name: 'Title',
          type: 'text',
          style: { fontSize: 24 },
          content: { text: 'Title' },
          children: [],
        },
      ],
    },
    {
      id: 'cta',
      name: 'CTA Button',
      type: 'box',
      style: {
        padding: '8px 16px',
        background: '#66a3ff',
        color: '#0f131a',
        borderRadius: 8,
      },
      children: [],
    },
  ],
};

interface EditorState {
  tree: Node;
  selectedIds: string[];
  select: (id: string, additive?: boolean) => void;
  updateStyle: (id: string, style: Record<string, any>) => void;
  deleteNode: (id: string) => void;
  duplicateNode: (id: string) => void;
  addTemplate: (tpl: { name: string; html: string }) => void;
  applyFeature: (feat: { style: Record<string, string> }) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const EditorContext = createContext<EditorState | null>(null);

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

function removeNode(node: Node, id: string): Node {
  node.children = node.children
    .filter((c) => c.id !== id)
    .map((c) => removeNode(c, id));
  return node;
}

function findParent(
  node: Node,
  id: string,
): { parent: Node; index: number } | null {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.id === id) return { parent: node, index: i };
    const res = findParent(child, id);
    if (res) return res;
  }
  return null;
}

function cloneSubtree(node: Node): Node {
  return {
    ...node,
    id: genId(),
    children: node.children.map(cloneSubtree),
  };
}

export function EditorProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<{
    past: Node[];
    present: Node;
    future: Node[];
  }>({ past: [], present: initialTree, future: [] });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const tree = history.present;

  const commit = (newTree: Node) => {
    setHistory((h) => ({
      past: [...h.past, h.present],
      present: newTree,
      future: [],
    }));
  };

  const select = (id: string, additive = false) => {
    setSelectedIds((ids) => {
      if (additive) {
        return ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id];
      }
      return [id];
    });
  };

  const updateStyle = (id: string, style: Record<string, any>) => {
    const clone: Node = JSON.parse(JSON.stringify(tree));
    updateNode(clone, id, (n) => {
      n.style = { ...n.style, ...style };
    });
    commit(clone);
  };

  const deleteNode = (id: string) => {
    const clone: Node = JSON.parse(JSON.stringify(tree));
    removeNode(clone, id);
    commit(clone);
    setSelectedIds((ids) => ids.filter((i) => i !== id));
  };

  const duplicateNode = (id: string) => {
    const clone: Node = JSON.parse(JSON.stringify(tree));
    const parentInfo = findParent(clone, id);
    const original = findNode(clone, id);
    if (parentInfo && original) {
      const copy = cloneSubtree(original);
      parentInfo.parent.children.splice(parentInfo.index + 1, 0, copy);
    }
    commit(clone);
  };

  const addTemplate = (tpl: { name: string; html: string }) => {
    const clone: Node = JSON.parse(JSON.stringify(tree));
    clone.children.push({
      id: genId(),
      name: tpl.name,
      type: 'box',
      style: {},
      children: [],
      content: { html: tpl.html },
    });
    commit(clone);
  };

  const applyFeature = (feat: { style: Record<string, string> }) => {
    if (selectedIds.length === 0) return;
    const clone: Node = JSON.parse(JSON.stringify(tree));
    selectedIds.forEach((id) => {
      updateNode(clone, id, (n) => {
        n.style = { ...n.style, ...feat.style };
      });
    });
    commit(clone);
  };

  const undo = () => {
    setHistory((h) => {
      if (h.past.length === 0) return h;
      const previous = h.past[h.past.length - 1];
      const newPast = h.past.slice(0, -1);
      return {
        past: newPast,
        present: previous,
        future: [h.present, ...h.future],
      };
    });
    setSelectedIds([]);
  };

  const redo = () => {
    setHistory((h) => {
      if (h.future.length === 0) return h;
      const next = h.future[0];
      const newFuture = h.future.slice(1);
      return {
        past: [...h.past, h.present],
        present: next,
        future: newFuture,
      };
    });
    setSelectedIds([]);
  };

  return (
    <EditorContext.Provider
      value={{
        tree,
        selectedIds,
        select,
        updateStyle,
        deleteNode,
        duplicateNode,
        addTemplate,
        applyFeature,
        undo,
        redo,
        canUndo: history.past.length > 0,
        canRedo: history.future.length > 0,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('useEditor must be used within EditorProvider');
  const {
    tree,
    selectedIds,
    select,
    updateStyle,
    deleteNode,
    duplicateNode,
    addTemplate,
    applyFeature,
    undo,
    redo,
    canUndo,
    canRedo,
  } = ctx;
  const selected = selectedIds[0] ? findNode(tree, selectedIds[0]) : null;
  return {
    tree,
    selectedIds,
    selected,
    select,
    updateStyle,
    deleteNode,
    duplicateNode,
    addTemplate,
    applyFeature,
    undo,
    redo,
    canUndo,
    canRedo,
  } as const;
}

export default EditorContext;
