import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';

import ScrollFab from './scroll-fab';

describe('ScrollFab', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    });
  });

  it('renders the scroll button', () => {
    renderWithProviders(<ScrollFab />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
