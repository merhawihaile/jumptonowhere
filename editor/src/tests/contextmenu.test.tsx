import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('context menu duplicates a node', async () => {
  render(<App />);
  const node = screen.getByTestId('cta');
  const root = screen.getByTestId('root');
  const initial = root.children.length;
  fireEvent.contextMenu(node);
  const dup = await screen.findByText('Duplicate');
  fireEvent.click(dup);
  await waitFor(() => {
    expect(root.children.length).toBe(initial + 1);
  });
});

test('context menu deletes a node', async () => {
  render(<App />);
  const node = screen.getByTestId('cta');
  fireEvent.contextMenu(node);
  const del = await screen.findByText('Delete');
  fireEvent.click(del);
  await waitFor(() => {
    expect(screen.queryByTestId('cta')).not.toBeInTheDocument();
  });
});
