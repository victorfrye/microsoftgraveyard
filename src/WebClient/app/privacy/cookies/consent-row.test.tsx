import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';

import CookieConsentRow from './consent-row';

describe('CookieConsentRow', () => {
  it('renders title and description', () => {
    renderWithProviders(
      <CookieConsentRow
        title="Test Title"
        description="Test Description"
        checked={false}
      />,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders switch in checked state', () => {
    renderWithProviders(
      <CookieConsentRow
        title="Test Title"
        description="Test Description"
        checked={true}
      />,
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toBeChecked();
  });

  it('renders switch in disabled state when disabled prop is true', () => {
    renderWithProviders(
      <CookieConsentRow
        title="Test Title"
        description="Test Description"
        checked={true}
        disabled={true}
      />,
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toBeDisabled();
  });
});
