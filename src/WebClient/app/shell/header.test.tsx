import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';

import Header from './header';

describe('Header', () => {
  it('renders the title text "Microsoft Graveyard"', () => {
    renderWithProviders(<Header />);

    expect(
      screen.getByText('Microsoft Graveyard', { exact: true }),
    ).toBeInTheDocument();
  });

  it('renders the tagline "In remembrance of those killed by Microsoft"', () => {
    renderWithProviders(<Header />);

    expect(
      screen.getByText('In remembrance of those killed by Microsoft', {
        exact: true,
      }),
    ).toBeInTheDocument();
  });

  it('renders the headstone image with alt text', () => {
    renderWithProviders(<Header />);

    const image = screen.getByAltText(
      'a headstone icon of Microsoft Graveyard',
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/assets/headstone.svg');
  });
});
