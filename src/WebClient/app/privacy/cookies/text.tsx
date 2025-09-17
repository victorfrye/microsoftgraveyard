import { Link, Text } from '@fluentui/react-components';

const CookieText = {
  consentDialog: {
    title: 'We value your privacy',
    body: (
      <>
        This website uses cookies to enhance your user experience and analyze
        performance and traffic on our website. By clicking{' '}
        <Text weight="bold">Accept All</Text>, you consent to our use of cookies
        and <Link href={'https://victorfrye.com/privacy'}>Privacy Policy</Link>.
      </>
    ),
  },

  managerDialog: {
    title: 'Manage your cookie settings',
    body: (
      <>
        This website uses cookies to enhance your user experience and analyze
        performance and traffic on our website. You will find detailed
        information about each cookie consent category below. To learn more
        about our use of cookies and your privacy rights, please visit our{' '}
        <Link href={'https://victorfrye.com/privacy'}>Privacy Policy</Link>.
      </>
    ),
  },

  consentRow: {
    necessary: {
      title: 'Necessary',
      description:
        'Necessary cookies are essential for us to operate this website, including providing a secure log in or adjusting consent preferences. These cookies do not store any personal information and cannot be disabled.',
    },
    analytics: {
      title: 'Analytics',
      description:
        'Analytics cookies help us understand how our visitors use the website and to monitor website performance. These cookies allow us to improve the website experience with evidence-based insights. Disabling these cookies may result in a less optimized experience.',
    },
    advertising: {
      title: 'Advertising',
      description:
        'Advertising cookies are used to deliver advertisements that are relevant to you and your interests. These cookies track your browsing habits and may share that information with third parties. You can disable these cookies for less personalized advertising.',
    },
  },

  buttons: {
    accept: 'Accept all',
    reject: 'Reject unnecessary',
    manage: 'Manage cookies',
    save: 'Save settings',
  },
};

export default CookieText;
