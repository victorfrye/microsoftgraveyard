import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';
import type { Corpse } from './corpse';
import Headstone from './headstone';

jest.mock('./use-corpse', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useCorpse from './use-corpse';

const mockUseCorpse = useCorpse as jest.MockedFunction<typeof useCorpse>;

describe('Headstone', () => {
  const mockCorpse: Corpse = {
    name: 'Windows Phone',
    qualifier: 'Mobile OS',
    birthDate: new Date('2010-10-21'),
    deathDate: new Date('2019-12-10'),
    description: 'a mobile operating system',
    link: 'https://example.com/windows-phone',
  };

  const mockToday = new Date('2024-06-15');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading state', () => {
    it('renders skeleton when loading is true', () => {
      mockUseCorpse.mockReturnValue({
        name: '',
        lifeDates: '',
        obituary: '',
        isDead: true,
        loading: true,
      });

      renderWithProviders(<Headstone corpse={mockCorpse} today={mockToday} />);

      const skeleton = screen.getByLabelText('Loading headstone');
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('Loaded state', () => {
    beforeEach(() => {
      mockUseCorpse.mockReturnValue({
        name: 'Windows Phone (Mobile OS)',
        lifeDates: '2010 - 2019',
        obituary:
          'Killed by Microsoft 4 years ago, Windows Phone (Mobile OS) was a mobile operating system. It was 9 years old.',
        isDead: true,
        loading: false,
      });
    });

    it('renders headstone name when loaded', () => {
      renderWithProviders(<Headstone corpse={mockCorpse} today={mockToday} />);

      const name = screen.getByText('Windows Phone (Mobile OS)');
      expect(name).toBeInTheDocument();
    });

    it('renders life dates when loaded', () => {
      renderWithProviders(<Headstone corpse={mockCorpse} today={mockToday} />);

      const lifeDates = screen.getByText('2010 - 2019');
      expect(lifeDates).toBeInTheDocument();
    });

    it('renders obituary text when loaded', () => {
      renderWithProviders(<Headstone corpse={mockCorpse} today={mockToday} />);

      const obituary = screen.getByText(/Killed by Microsoft 4 years ago/);
      expect(obituary).toBeInTheDocument();
      expect(obituary).toHaveTextContent(
        'Killed by Microsoft 4 years ago, Windows Phone (Mobile OS) was a mobile operating system. It was 9 years old.',
      );
    });
  });

  describe('Dead corpse rendering', () => {
    it('renders headstone.svg image when corpse isDead', () => {
      mockUseCorpse.mockReturnValue({
        name: 'Windows Phone (Mobile OS)',
        lifeDates: '2010 - 2019',
        obituary:
          'Killed by Microsoft 4 years ago, Windows Phone (Mobile OS) was a mobile operating system.',
        isDead: true,
        loading: false,
      });

      renderWithProviders(<Headstone corpse={mockCorpse} today={mockToday} />);

      const headstoneSvg = screen.getByRole('img', { name: /headstone/i });
      expect(headstoneSvg).toBeInTheDocument();
      expect(headstoneSvg).toHaveAttribute(
        'src',
        expect.stringContaining('headstone.svg'),
      );
    });
  });

  describe('Alive corpse rendering', () => {
    it('renders coffin.svg image when corpse is not dead', () => {
      const aliveCorpse: Corpse = {
        name: 'Future Product',
        deathDate: new Date('2030-06-15'),
        description: 'a future product',
        link: 'https://example.com/future',
      };

      mockUseCorpse.mockReturnValue({
        name: 'Future Product',
        lifeDates: 'June 2030',
        obituary:
          'To be killed by Microsoft in 6 years, Future Product is a future product.',
        isDead: false,
        loading: false,
      });

      renderWithProviders(<Headstone corpse={aliveCorpse} today={mockToday} />);

      const img = screen.getByRole('img', { name: /headstone/i });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', expect.stringContaining('coffin.svg'));
    });
  });

  describe('News link', () => {
    it('renders news link with corpse.link', () => {
      mockUseCorpse.mockReturnValue({
        name: 'Windows Phone (Mobile OS)',
        lifeDates: '2010 - 2019',
        obituary:
          'Killed by Microsoft 4 years ago, Windows Phone (Mobile OS) was a mobile operating system.',
        isDead: true,
        loading: false,
      });

      const { container } = renderWithProviders(
        <Headstone corpse={mockCorpse} today={mockToday} />,
      );

      const newsLink = container.querySelector(
        'a[href="https://example.com/windows-phone"]',
      );
      expect(newsLink).toBeInTheDocument();
    });
  });
});
