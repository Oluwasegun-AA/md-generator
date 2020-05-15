import { isNil, get, has } from 'lodash';
import { execSync } from 'child_process';
import { getPackageJson, getProjectName } from './utils';
import { IProjectInfos } from '../../types/typeDeclarations.interface';

const GITHUB_URL = 'https://github.com/';

/**
 * @description Clean repository url by removing '.git' and 'git+'
 *
 * @param repoUrl repository url
 */
const cleanRepoUrl = (repoUrl: any): string =>
  repoUrl
    .replace('\n', '')
    .replace('git+', '')
    .replace('.git', '');

/**
 * @description Get repository url from package.json
 */
const getRepoUrlFromPackageJson = async (packageJson: any): Promise<any> => {
  const repoUrl = get(packageJson, 'repository.url', undefined);
  return isNil(repoUrl) ? undefined : cleanRepoUrl(repoUrl);
};

/**
 * @description Get repository url from git
 */
export const getRepoUrlFromGit = (): any => {
  try {
    const stdout = execSync('git config --get remote.origin.url');
    return cleanRepoUrl(stdout);
  } catch (err) {
    return undefined;
  }
};

/**
 * @description Get repository url from package.json or git
 *
 * @param packageJson package.json file
 */
const getRepoUrl = async (packageJson?: any): Promise<string> =>
  (await getRepoUrlFromPackageJson(packageJson)) || getRepoUrlFromGit();

/**
 * @description Get repository issues url from package.json or git
 *
 * @param packageJson package.json file
 */
export const getRepoIssuesUrl = async (packageJson: any): Promise<string> => {
  let repoIssuesUrl = get(packageJson, 'bugs.url', undefined);

  if (isNil(repoIssuesUrl)) {
    const repoUrl = await getRepoUrl();

    if (!isNil(repoUrl)) {
      repoIssuesUrl = `${repoUrl}/issues`;
    }
  }
  return repoIssuesUrl;
};

/**
 * @description Check if repository is a Github repository
 *
 * @param repositoryUrl repository URL
 */
const isGithubRepository = (repositoryUrl: string): boolean =>
  !isNil(repositoryUrl) && repositoryUrl.includes(GITHUB_URL);

/**
 * @description Get github username from repository url
 *
 * @param repositoryUrl repository URL
 */
const getGithubUsernameFromRepositoryUrl = (repositoryUrl: string): string =>
  repositoryUrl.replace(GITHUB_URL, '').split('/')[0];

/**
 * @description Get license url from github repository url
 *
 * @param repositoryUrl repository URL
 */
const getLicenseUrlFromGithubRepositoryUrl = (repositoryUrl: string): string =>
  `${repositoryUrl}/blob/master/LICENSE`;

const getReadmeUrlFromGithubRepositoryUrl = (repositoryUrl: string): string =>
  `${repositoryUrl}#readme`;

/**
 * @description Get project author name from package.json
 *
 * @param packageJson package.json file
 * @returns authorName
 */
export const getAuthorName = (packageJson: any): any => {
  if (has(packageJson, 'author.name')) {
    return get(packageJson, 'author.name', undefined);
  }
  if (has(packageJson, 'author') && typeof packageJson.author === 'string') {
    return get(packageJson, 'author', undefined);
  }
  return undefined;
};

/**
 * @description Get project information from git and package.json
 */
const getProjectInfos = async (): Promise<IProjectInfos> => {
  const packageJson = await getPackageJson();
  const name = getProjectName(packageJson);
  const description = get(packageJson, 'description', undefined);
  const engines = get(packageJson, 'engines', undefined);
  const author = getAuthorName(packageJson);
  const version = get(packageJson, 'version', undefined);
  const licenseName = { name: get(packageJson, 'license', undefined) };
  const homepage = get(packageJson, 'homepage', undefined);
  const usage = has(packageJson, 'scripts.start') ? 'npm run start' : undefined;
  const testCommand = has(packageJson, 'scripts.test')
    ? 'npm run test'
    : undefined;
  const repositoryUrl = await getRepoUrl(packageJson);
  const contributingUrl = await getRepoIssuesUrl(packageJson);
  const isGithubRepo = isGithubRepository(repositoryUrl);
  const documentationUrl = isGithubRepo
    ? getReadmeUrlFromGithubRepositoryUrl(repositoryUrl)
    : undefined;
  const githubUsername = isGithubRepo
    ? getGithubUsernameFromRepositoryUrl(repositoryUrl)
    : undefined;
  const licenseUrl = isGithubRepo
    ? getLicenseUrlFromGithubRepositoryUrl(repositoryUrl)
    : undefined;

  return {
    name,
    description,
    version,
    author,
    homepage,
    repositoryUrl,
    contributingUrl,
    githubUsername,
    engines,
    licenseName,
    licenseUrl,
    documentationUrl,
    isGithubRepo,
    usage,
    testCommand,
  };
};

export default getProjectInfos;
