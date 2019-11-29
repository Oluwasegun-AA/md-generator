import { cleanSocialNetworkUsername } from '../../../../projectEnv/utils';
import { IProjectInfos, IQuestionResponse } from '../../../../types/typeDeclarations.interface';

const authorGithubUsername = (projectInfos: IProjectInfos): IQuestionResponse => ({
  type: 'input',
  message: '  GitHub username (use empty value to skip)',
  name: 'authorGithubUsername',
  default: projectInfos.githubUsername,
  filter: cleanSocialNetworkUsername,
});

export default authorGithubUsername;
