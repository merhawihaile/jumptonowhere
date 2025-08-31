import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('selecting a node shows its name in inspector', () => {
  render(<App />);
  fireEvent.click(screen.getByText('CTA Button'));
  expect(screen.getByTestId('inspector')).toHaveTextContent('CTA Button');
});

test('shift clicking adds to selection', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Hero'));
  fireEvent.click(screen.getByText('CTA Button'), { shiftKey: true });
  const outliner = screen.getByTestId('outliner');
  const highlights = outliner.querySelectorAll('.bg-accent');
  expect(highlights.length).toBe(2);
});
