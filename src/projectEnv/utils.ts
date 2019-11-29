import loadJsonFile from 'load-json-file';
import path from 'path';
import getRepoName from 'git-repo-name';
import { execSync } from 'child_process';

/**
 * @description Get package json name property
 *
 * @param {Object} packageJson
 */
const getPackageJsonName = (packageJson = {}) => packageJson.name || undefined;

/**
 * @description Get git repository name
 * @param {String} cwd process.cwd()
 */
const getGitRepositoryName = cwd => {
  try {
    return getRepoName.sync({ cwd });
  } catch (err) {
    return undefined;
  }
};

/**
 * @description Get project name
 */
const getProjectName = packageJson => {
  const cwd = process.cwd();
  return (
    getPackageJsonName(packageJson) ||
    getGitRepositoryName(cwd) ||
    path.basename(cwd)
  );
};

/**
 * @description Get package.json content
 */
const getPackageJson = async () => {
  try {
    return await loadJsonFile('package.json');
  } catch (err) {
    return undefined;
  }
};

/**
 * @description Return true if the project is available on NPM, return false otherwise.
 * @param projectName
 * @returns boolean
 */
const isProjectAvailableOnNpm = projectName => {
  try {
    execSync(`npm view ${projectName}`, { stdio: 'ignore' });
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * @description Get the default answer depending on the question type
 * @param {Object} question
 */
const getDefaultAnswer = (question, answersContext) => {
  if (question.when && !question.when(answersContext)) return undefined;

  switch (question.type) {
    case 'input':
      return question.default || '';
    case 'checkbox':
      return question.choices
        .filter(choice => choice.checked)
        .map(choice => choice.value);
    default:
      return undefined;
  }
};

/**
 * @description Get default question's answers
 * @param {Array} questions
 */
const getDefaultAnswers = questions =>
  questions.reduce(
    (answersContext, question) => ({
      ...answersContext,
      [question.name]: getDefaultAnswer(question, answersContext),
    }),
    {}
  );

/**
 * @description Clean social network username by removing the @ prefix
 * @param input social network username input
 * @returns {*} input without the prefix
 */
const cleanSocialNetworkUsername = (input: string): string => input.replace(/^@/, '');

export {
  getPackageJson,
  getProjectName,
  getDefaultAnswers,
  getDefaultAnswer,
  cleanSocialNetworkUsername,
  isProjectAvailableOnNpm,
};
