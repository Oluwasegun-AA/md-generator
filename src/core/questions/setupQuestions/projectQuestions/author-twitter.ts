import { cleanSocialNetworkUsername } from '../../../../projectEnv/utils';
import { IQuestionResponse } from '../../../../types/typeDeclarations.interface';

const twitterUsername = (): IQuestionResponse => ({
  type: 'input',
  message: '  Twitter username (use empty value to skip)',
  name: 'authorTwitterUsername',
  filter: cleanSocialNetworkUsername,
});

export default twitterUsername;
