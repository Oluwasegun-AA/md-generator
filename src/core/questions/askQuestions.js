import inquirer from 'inquirer';
import { flatMap } from 'lodash';

import { setupQuestions } from './setupQuestions/index';
import * as utils from '../../projectEnv/utils';
import getProjectInfos from '../../projectEnv/projectInfo';

/**
 * @description Ask user questions on the terminal and returns selected answers
 * @param {Object} projectInfos
 * @param {Boolean} useDefaultAnswers
 */
const askQuestions = async (projectInfos, useDefaultAnswers) => {
  const question = flatMap(Object.values(setupQuestions), questionBuilder =>
    questionBuilder(projectInfos));

  const answersContext = useDefaultAnswers
    ? utils.getDefaultAnswers(question)
    : await inquirer.prompt(question);
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
const getInfos = async useDefaultAnswers => {
  const projectInformations = await getProjectInfos();
  const answersContext = await askQuestions(
    projectInformations,
    useDefaultAnswers
  );
  return answersContext;
};

export { askQuestions, getInfos };
