import inquirer from 'inquirer';
import { flatMap } from 'lodash';

import {
  readmeQuestions,
  licenseQuestions,
  codeOfConductQuestions,
} from './setupQuestions/index';
import * as utils from '../../projectEnv/utils';
import getProjectInfos from '../../projectEnv/projectInfo';
import { IProjectInfos, IQuestions } from '../../../types/typeDeclarations.interface';

export const find = (files: string[], item: string): any => files.find((element: string) => element === item);
export const getAppropriateQuestion = (files: string[]): IQuestions| null => {
  const readmeQstn = find(files, 'README') ? readmeQuestions : null;
  const licenseQstn = find(files, 'LICENSE') ? licenseQuestions : null;
  const codeOfConductQstn = find(files, 'CODE_OF_CONDUCT')
    ? codeOfConductQuestions
    : null;
  return readmeQstn || licenseQstn || codeOfConductQstn;
};

/**
 * @description Ask user questions on the terminal and returns selected answers
 * @param projectInfos project information retrieved from the codebase / supplied by user
 * @param useDefaultAnswers boolean
 */

const askQuestions = async (
  projectInfos: IProjectInfos,
  useDefaultAnswers: boolean,
  filesToBeCreated: string[]
): Promise<IProjectInfos> => {
  const filteredQuestions = getAppropriateQuestion(filesToBeCreated);
  const getQuestions = (questions: any) =>
    flatMap(Object.values(questions), (questionBuilder: any) => questionBuilder(projectInfos));
  const ask = async (questions: any) => {
    if (questions) {
      const data = await inquirer.prompt(questions);
      return data;
    }
    return utils.getDefaultAnswers(getQuestions(readmeQuestions));
  };
  const question: any = filteredQuestions ? getQuestions(filteredQuestions) : null;

  const answersContext: IProjectInfos = useDefaultAnswers
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
 */
const getInfos = async (useDefaultAnswers: boolean, filesToBeCreated: string[]) : Promise<IProjectInfos> => {
  const projectInformations: IProjectInfos = await getProjectInfos();
  const answersContext: IProjectInfos = await askQuestions(
    projectInformations,
    useDefaultAnswers,
    filesToBeCreated
  );
  return answersContext;
};

export { askQuestions, getInfos };
