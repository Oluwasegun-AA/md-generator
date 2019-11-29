import loadJsonFile from 'load-json-file';
import path from 'path';
import getRepoName from 'git-repo-name';
import { execSync } from 'child_process';
import { IQuestionResponse } from '../types/typeDeclarations.interface';

/**
 * @description Get package json name property
 *
 * @param packageJson package.json file
 */
const getPackageJsonName = (packageJson: any = {}): string => packageJson.name || undefined;

/**
 * @description Get git repository name
 * @param cwd process.cwd()
 */
const getGitRepositoryName = (cwd: any): string => {
  try {
    return getRepoName.sync({ cwd });
  } catch (err) {
    return undefined;
  }
};

/**
 * @description Get project name
 */
const getProjectName = (packageJson: any): string => {
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
const getPackageJson = async (): Promise<object> => {
  try {
    return await loadJsonFile('package.json');
  } catch (err) {
    return undefined;
  }
};

/**
 * @description Return true if the project is available on NPM, return false otherwise.
 * @param projectName project name
 * @returns boolean
 */
const isProjectAvailableOnNpm = (projectName: string): boolean => {
  try {
    execSync(`npm view ${projectName}`, { stdio: 'ignore' });
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * @description Get the default answer depending on the question type
 * @param question single question
 */
const getDefaultAnswer = (question: IQuestionResponse, answersContext: any): any => {
  if (question.when && !question.when(answersContext)) return undefined;

  switch (question.type) {
    case 'input':
      return question.default || '';
    case 'checkbox':
      return question.choices
        .filter((choice: any) => choice.checked)
        .map((choice: any) => choice.value);
    default:
      return undefined;
  }
};

/**
 * @description Get default question's answers
 * @param questions all questions
 */
const getDefaultAnswers = (questions: any): any =>
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
 * @returns input without the prefix
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
