import ShellText from './strings';

describe('ShellText', () => {
  describe('header', () => {
    it('should have correct title', () => {
      expect(ShellText.header.title).toBe('Microsoft Graveyard');
    });

    it('should have correct tagline', () => {
      expect(ShellText.header.tagline).toBe(
        'In remembrance of those killed by Microsoft',
      );
    });
  });

  describe('footer', () => {
    describe('socials', () => {
      it('should have correct github text', () => {
        expect(ShellText.footer.socials.github).toBe(
          'victorfrye/microsoftgraveyard | GitHub',
        );
      });

      it('should have correct threads text', () => {
        expect(ShellText.footer.socials.threads).toBe(
          '@microsoftgraveyard | Threads',
        );
      });
    });

    describe('toggleColor', () => {
      it('should return correct dark mode text', () => {
        expect(ShellText.footer.toggleColor('dark')).toBe('Toggle dark mode');
      });

      it('should return correct light mode text', () => {
        expect(ShellText.footer.toggleColor('light')).toBe('Toggle light mode');
      });
    });

    it('should have correct byline', () => {
      expect(ShellText.footer.byline).toBe('Made with 💙 by Victor Frye');
    });

    it('should have correct privacy text', () => {
      expect(ShellText.footer.privacy).toBe('Privacy');
    });

    describe('copyright', () => {
      it('should return correct copyright text for given year', () => {
        expect(ShellText.footer.copyright(2026)).toBe('© Victor Frye 2026');
      });
    });
  });
});
