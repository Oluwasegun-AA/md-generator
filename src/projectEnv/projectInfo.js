import isNil from 'lodash/isNil';
import get from 'lodash/get';
import has from 'lodash/has';
import { execSync } from 'child_process';
import { getPackageJson, getProjectName } from './utils';

const GITHUB_URL = 'https://github.com/';

/**
 * @description Clean repository url by removing '.git' and 'git+'
 *
 * @param {string} repoUrl
 */
const cleanRepoUrl = repoUrl =>
  repoUrl
    .replace('\n', '')
    .replace('git+', '')
    .replace('.git', '');

/**
 * @description Get repository url from package.json
 *
 * @param {Object} repoUrl
 */
const getRepoUrlFromPackageJson = async packageJson => {
  const repoUrl = get(packageJson, 'repository.url', undefined);
  return isNil(repoUrl) ? undefined : cleanRepoUrl(repoUrl);
};

/**
 * @description Get repository url from git
 */
const getRepoUrlFromGit = () => {
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
 * @param {Object} packageJson
 */
const getRepoUrl = async packageJson =>
  (await getRepoUrlFromPackageJson(packageJson)) || getRepoUrlFromGit();

/**
 * @description Get repository issues url from package.json or git
 *
 * @param {Object} packageJson
 */
const getRepoIssuesUrl = async packageJson => {
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
 * @param {string} repositoryUrl
 */
const isGithubRepository = repositoryUrl =>
  !isNil(repositoryUrl) && repositoryUrl.includes(GITHUB_URL);

/**
 * @description Get github username from repository url
 *
 * @param {string} repositoryUrl
 */
const getGithubUsernameFromRepositoryUrl = repositoryUrl =>
  repositoryUrl.replace(GITHUB_URL, '').split('/')[0];

/**
 * @description Get license url from github repository url
 *
 * @param {string} repositoryUrl
 */
const getLicenseUrlFromGithubRepositoryUrl = repositoryUrl =>
  `${repositoryUrl}/blob/master/LICENSE`;

const getReadmeUrlFromGithubRepositoryUrl = repositoryUrl =>
  `${repositoryUrl}#readme`;

/**
 * @description Get project author name from package.json
 *
 * @param {Object} packageJson
 * @returns {string} authorName
 */
const getAuthorName = packageJson => {
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
const getProjectInfos = async () => {
  const packageJson = await getPackageJson();
  const name = getProjectName(packageJson);
  const description = get(packageJson, 'description', undefined);
  const engines = get(packageJson, 'engines', undefined);
  const author = getAuthorName(packageJson);
  const version = get(packageJson, 'version', undefined);
  const licenseName = get(packageJson, 'license', undefined);
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
