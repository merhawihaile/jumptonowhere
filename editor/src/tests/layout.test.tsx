import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('Editor layout', () => {
  it('renders all primary panels', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toHaveTextContent(/My Project/i);
    expect(screen.getByTestId('outliner')).toBeInTheDocument();
    expect(screen.getByTestId('viewport')).toBeInTheDocument();
    expect(screen.getByTestId('inspector')).toBeInTheDocument();
    expect(screen.getByTestId('content-browser')).toBeInTheDocument();
  });
});
