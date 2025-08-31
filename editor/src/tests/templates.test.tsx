import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { componentTemplates } from '../templates/componentTemplates';

it('lists templates and inserts selected template into viewport', () => {
  render(<App />);
  const select = screen.getByLabelText('template') as HTMLSelectElement;
  // +1 for placeholder option
  expect(select.options.length - 1).toBe(componentTemplates.length);
  fireEvent.change(select, { target: { value: componentTemplates[0].id } });
  fireEvent.click(screen.getByText('Add'));
  const viewport = screen.getByTestId('viewport');
  expect(within(viewport).getByText(/Template 1/)).toBeInTheDocument();
});
