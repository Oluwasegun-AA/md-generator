import inquirer from 'inquirer';
import { flatMap } from 'lodash';

import questionsBuilders from './setupQuestions/index';
import * as utils from '../../project-env/utils';

/**
 * @description Ask user questions on the terminal and returns selected answers
 * @param {Object} projectInfos
 * @param {Boolean} useDefaultAnswers
 */
const askQuestions = async (projectInfos, useDefaultAnswers) => {
  const question = flatMap(Object.values(questionsBuilders), questionBuilder =>
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

export default askQuestions;
