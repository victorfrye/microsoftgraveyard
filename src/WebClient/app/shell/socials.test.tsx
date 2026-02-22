import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';

import SocialButtons from './socials';

jest.mock('@/assets', () => ({
  GitHubIcon: () => <span data-testid="github-icon" />,
  ThreadsIcon: () => <span data-testid="threads-icon" />,
}));

describe('SocialButtons', () => {
  it('renders GitHub social button with correct link', () => {
    renderWithProviders(<SocialButtons />);

    const githubIcon = screen.getByTestId('github-icon');
    expect(githubIcon).toBeInTheDocument();

    const githubLink = githubIcon.closest('a');
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/victorfrye/microsoftgraveyard',
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'me noreferrer noopener');
  });

  it('renders Threads social button with correct link', () => {
    renderWithProviders(<SocialButtons />);

    const threadsIcon = screen.getByTestId('threads-icon');
    expect(threadsIcon).toBeInTheDocument();

    const threadsLink = threadsIcon.closest('a');
    expect(threadsLink).toHaveAttribute(
      'href',
      'https://www.threads.net/@microsoftgraveyard',
    );
    expect(threadsLink).toHaveAttribute('target', '_blank');
    expect(threadsLink).toHaveAttribute('rel', 'me noreferrer noopener');
  });
});
