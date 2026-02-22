import { renderWithProviders } from '@test-utils';
import { act, screen } from '@testing-library/react';

import CookieConsentDialog from './consent-dialog';

describe('CookieConsentDialog', () => {
  const mockOnAccept = jest.fn();
  const mockOnReject = jest.fn();
  const mockOnManage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog title "We value your privacy" when open', () => {
    renderWithProviders(
      <CookieConsentDialog
        open={true}
        onAccept={mockOnAccept}
        onReject={mockOnReject}
        onManage={mockOnManage}
      />,
    );

    expect(screen.getByText('We value your privacy')).toBeInTheDocument();
  });

  it('renders accept, reject, manage buttons', () => {
    renderWithProviders(
      <CookieConsentDialog
        open={true}
        onAccept={mockOnAccept}
        onReject={mockOnReject}
        onManage={mockOnManage}
      />,
    );

    expect(
      screen.getByRole('button', { name: /accept all/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reject unnecessary/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /manage cookies/i }),
    ).toBeInTheDocument();
  });

  it('calls onAccept when accept clicked', () => {
    renderWithProviders(
      <CookieConsentDialog
        open={true}
        onAccept={mockOnAccept}
        onReject={mockOnReject}
        onManage={mockOnManage}
      />,
    );

    const acceptButton = screen.getByRole('button', { name: /accept all/i });
    act(() => {
      acceptButton.click();
    });
    expect(mockOnAccept).toHaveBeenCalledTimes(1);
  });

  it('calls onReject when reject clicked', () => {
    renderWithProviders(
      <CookieConsentDialog
        open={true}
        onAccept={mockOnAccept}
        onReject={mockOnReject}
        onManage={mockOnManage}
      />,
    );

    const rejectButton = screen.getByRole('button', {
      name: /reject unnecessary/i,
    });
    act(() => {
      rejectButton.click();
    });
    expect(mockOnReject).toHaveBeenCalledTimes(1);
  });

  it('calls onManage when manage clicked', () => {
    renderWithProviders(
      <CookieConsentDialog
        open={true}
        onAccept={mockOnAccept}
        onReject={mockOnReject}
        onManage={mockOnManage}
      />,
    );

    const manageButton = screen.getByRole('button', {
      name: /manage cookies/i,
    });
    act(() => {
      manageButton.click();
    });
    expect(mockOnManage).toHaveBeenCalledTimes(1);
  });
});
