import { IProjectInfos, IQuestionResponse } from "types/typeDeclarations.interface";

const projectInfo: IProjectInfos = {
  name: 'hello',
  description: 'hello',
  version: 'hello',
  author: 'hello',
  homepage: 'hello',
  repositoryUrl: 'hello',
  contributingUrl: 'hello',
  githubUsername: 'hello',
  engines: 'hello',
  licenseName: {
    name: 'hello'
  },
  licenseUrl: 'hello',
  documentationUrl: 'hello',
  isGithubRepo: false,
  usage: 'hello',
  testCommand: 'hello',
  isGithubRepos: false,
  projectName: 'hello',
  projectPrerequisites: 'hello',
  isProjectOnNpm: 'hello'
};

const questionResponse: IQuestionResponse =  {
  type: 'hello',
  name: 'hello',
  message: 'hello',
  default: 'hello',
  filter: 'hello',
  choices: 'hello',
  when: 'hello',
};

export {
  projectInfo,
  questionResponse
};
