import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { interactiveFeatures } from '../templates/interactiveFeatures';

it('lists features and applies selected feature to the selected node', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('hero'));
  const select = screen.getByLabelText('feature') as HTMLSelectElement;
  expect(select.options.length - 1).toBe(interactiveFeatures.length);
  fireEvent.change(select, { target: { value: interactiveFeatures[0].id } });
  fireEvent.click(screen.getByText('Apply'));
  const node = screen.getByTestId('hero');
  expect(node).toHaveStyle(`transform: ${interactiveFeatures[0].style.transform}`);
});
