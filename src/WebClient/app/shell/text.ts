const ShellText = {
  header: {
    title: 'Microsoft Graveyard',
    tagline: 'In remembrance of those killed by Microsoft',
  },
  footer: {
    socials: {
      github: 'victorfrye/microsoftgraveyard | GitHub',
      threads: '@microsoftgraveyard | Threads',
    },
    toggleColor(mode: string) {
      return `Toggle ${mode} mode`;
    },
    byline: 'Made with 💙 by Victor Frye',
    privacy: 'Privacy',
    copyright(year: number) {
      return `© Victor Frye ${year}`;
    },
  },
};

export default ShellText;
