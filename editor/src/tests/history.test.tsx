import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('undo and redo revert style changes', () => {
  render(<App />);
  fireEvent.click(screen.getByText('CTA Button'));
  const colorInput = screen.getByLabelText('background');
  fireEvent.change(colorInput, { target: { value: '#ffffff' } });
  expect(screen.getByTestId('cta')).toHaveStyle({ background: '#ffffff' });
  fireEvent.click(screen.getByLabelText('undo'));
  expect(screen.getByTestId('cta')).not.toHaveStyle({ background: '#ffffff' });
  fireEvent.click(screen.getByLabelText('redo'));
  expect(screen.getByTestId('cta')).toHaveStyle({ background: '#ffffff' });
});
