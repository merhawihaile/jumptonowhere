import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

it('opens command palette and duplicates node', async () => {
  render(<App />);
  fireEvent.click(screen.getByText('CTA Button'));
  const initial = screen.getAllByText('CTA Button').length;
  fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
  const dup = await screen.findByText('Duplicate node');
  fireEvent.click(dup);
  await waitFor(() => {
    expect(screen.getAllByText('CTA Button').length).toBe(initial + 1);
  });
});

