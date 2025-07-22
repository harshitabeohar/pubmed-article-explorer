import {render, screen} from '@testing-library/react';
import ResetSearch from './ResetSearch';
import { vi } from 'vitest';

describe('ResetSearch Component', () => {
  it('renders ResetSearch button', () => {
    const mockOnReset = vi.fn();
    render(<ResetSearch onReset={mockOnReset} />);

    const button = screen.getByRole('button', { name: /reset search/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition');
  });

  it('calls onReset when clicked', () => {
    const mockOnReset = vi.fn();
    render(<ResetSearch onReset={mockOnReset} />);

    const button = screen.getByRole('button', { name: /reset search/i });
    button.click();

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
});