import { renderWithProviders } from '@test-utils';
import { act, screen } from '@testing-library/react';

import CookieFab from './fab';

describe('CookieFab', () => {
  it('renders cookie fab button', () => {
    const mockOnClick = jest.fn();

    renderWithProviders(<CookieFab onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();

    renderWithProviders(<CookieFab onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    act(() => {
      button.click();
    });
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
