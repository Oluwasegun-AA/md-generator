import { cleanSocialNetworkUsername } from '../../../../projectEnv/utils';

const twitterUsername = () => ({
  type: 'input',
  message: '  Twitter username (use empty value to skip)',
  name: 'authorTwitterUsername',
  filter: cleanSocialNetworkUsername,
});

export default twitterUsername;
