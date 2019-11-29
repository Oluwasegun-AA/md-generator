import inquirer from 'inquirer';
import { flatMap } from 'lodash';

import {
  readmeQuestions,
  licenseQuestions,
  codeOfConductQuestions,
} from './setupQuestions/index';
import * as utils from '../../projectEnv/utils';
import getProjectInfos from '../../projectEnv/projectInfo';

const find = (files, item) => files.find(element => element === item);
const getAppropriateQuestion = files => {
  const readmeQstn = find(files, 'README') ? readmeQuestions : null;
  const licenseQstn = find(files, 'LICENSE') ? licenseQuestions : null;
  const codeOfConductQstn = find(files, 'CODE_OF_CONDUCT')
    ? codeOfConductQuestions
    : null;
  return readmeQstn || licenseQstn || codeOfConductQstn;
};

/**
 * @description Ask user questions on the terminal and returns selected answers
 * @param {Object} projectInfos
 * @param {Boolean} useDefaultAnswers
 */

const askQuestions = async (
  projectInfos,
  useDefaultAnswers,
  filesToBeCreated
) => {
  const filteredQuestions = getAppropriateQuestion(filesToBeCreated);
  const getQuestions = questions =>
    flatMap(Object.values(questions), questionBuilder =>
      questionBuilder(projectInfos));
  const ask = async questions => {
    if (questions) {
      const data = await inquirer.prompt(questions);
      return data;
    }
    return utils.getDefaultAnswers(getQuestions(readmeQuestions));
  };
  const question = filteredQuestions ? getQuestions(filteredQuestions) : null;

  const answersContext = useDefaultAnswers
    ? utils.getDefaultAnswers(getQuestions(readmeQuestions))
    : await ask(question);
  return {
    isGithubRepos: projectInfos.isGithubRepos,
    repositoryUrl: projectInfos.repositoryUrl,
    projectPrerequisites: undefined,
    isProjectOnNpm: utils.isProjectAvailableOnNpm(answersContext.projectName),
    ...answersContext,
  };
};

/**
 * @description
 * 1) Gather project infos
 * 2) Ask user questions
 * 3) return all answers
 *
 * @param {Object} args
 *@returns {Object} answersContext
 */
const getInfos = async (useDefaultAnswers, filesToBeCreated) => {
  const projectInformations = await getProjectInfos();
  const answersContext = await askQuestions(
    projectInformations,
    useDefaultAnswers,
    filesToBeCreated
  );
  return answersContext;
};

export { askQuestions, getInfos };
