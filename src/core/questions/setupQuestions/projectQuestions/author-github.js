import { cleanSocialNetworkUsername } from '../../../../project-env/utils';

const authorGithubUsername = projectInfos => ({
  type: 'input',
  message: '👤  GitHub username (use empty value to skip)',
  name: 'authorGithubUsername',
  default: projectInfos.githubUsername,
  filter: cleanSocialNetworkUsername,
});

export default authorGithubUsername;
