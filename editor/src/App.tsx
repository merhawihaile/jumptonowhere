import Toolbar from './components/Toolbar';
import Outliner from './outliner/Outliner';
import Viewport from './canvas/Viewport';
import Inspector from './inspector/Inspector';
import ContentBrowser from './content-browser/ContentBrowser';
import CommandPalette from './components/CommandPalette';
import { EditorProvider } from './store/EditorContext';

export default function App() {
  return (
    <EditorProvider>
      <CommandPalette />
      <div className="h-screen grid grid-cols-[240px_1fr_240px] grid-rows-[auto_1fr_200px]">
        <Toolbar className="col-span-3 row-start-1" />
        <Outliner className="row-start-2 col-start-1" />
        <Viewport className="row-start-2 col-start-2" />
        <Inspector className="row-start-2 col-start-3" />
        <ContentBrowser className="row-start-3 col-span-3" />
      </div>
    </EditorProvider>
  );
}
