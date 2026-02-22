import { render, screen } from '@testing-library/react';
import CookieText from './strings';

describe('CookieText', () => {
  describe('consentDialog', () => {
    it('should have correct title', () => {
      expect(CookieText.consentDialog.title).toBe('We value your privacy');
    });

    it('should render body with expected content', () => {
      render(<div>{CookieText.consentDialog.body}</div>);
      expect(
        screen.getByText(/This website uses cookies to enhance/i),
      ).toBeInTheDocument();
      expect(screen.getByText('Accept all')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Privacy Policy' }),
      ).toHaveAttribute('href', 'https://victorfrye.com/privacy');
    });
  });

  describe('managerDialog', () => {
    it('should have correct title', () => {
      expect(CookieText.managerDialog.title).toBe(
        'Manage your cookie settings',
      );
    });

    it('should render body with expected content', () => {
      render(<div>{CookieText.managerDialog.body}</div>);
      expect(
        screen.getByText(/This website uses cookies to enhance/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/You will find detailed information/i),
      ).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Privacy Policy' }),
      ).toHaveAttribute('href', 'https://victorfrye.com/privacy');
    });
  });

  describe('consentRow', () => {
    it('should have correct necessary title', () => {
      expect(CookieText.consentRow.necessary.title).toBe('Necessary');
    });

    it('should have correct analytics title', () => {
      expect(CookieText.consentRow.analytics.title).toBe('Analytics');
    });

    it('should have correct advertising title', () => {
      expect(CookieText.consentRow.advertising.title).toBe('Advertising');
    });
  });

  describe('buttons', () => {
    it('should have correct accept text', () => {
      expect(CookieText.buttons.accept).toBe('Accept all');
    });

    it('should have correct reject text', () => {
      expect(CookieText.buttons.reject).toBe('Reject unnecessary');
    });

    it('should have correct manage text', () => {
      expect(CookieText.buttons.manage).toBe('Manage cookies');
    });

    it('should have correct save text', () => {
      expect(CookieText.buttons.save).toBe('Save settings');
    });
  });
});
