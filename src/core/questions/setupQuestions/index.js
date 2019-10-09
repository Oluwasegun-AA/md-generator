import askProjectName from './projectQuestions/project-name';
import askProjectVersion from './projectQuestions/project-version';
import askProjectDescription from './projectQuestions/project-description';
import askProjectHomepage from './projectQuestions/project-homepage';
import askProjectDocumentationUrl from './projectQuestions/project-documentation-url';
import askAuthorName from './projectQuestions/author-name';
import askAuthorGithub from './projectQuestions/author-github';
import askAuthorTwitter from './projectQuestions/author-twitter';
import askAuthorPatreon from './projectQuestions/author-patreon';
import askProjectPrerequisites from './projectQuestions/project-prerequisites';
import askLicenseName from './projectQuestions/license-name';
import askLicenseUrl from './projectQuestions/license-url';
import askContributing from './projectQuestions/contributing';
import askInstallCommand from './projectQuestions/install-command';
import askUsage from './projectQuestions/usage';
import askTestCommand from './projectQuestions/test-command';
import chooseTemplate from './projectQuestions/choose-template';
import {
  removeFiles,
  validateRemove,
  removeRequired,
  removeOptional,
} from './removeCommand/removeInit';
import {
  createFiles,
  createRequired,
  createOptional,
  selectFileToCreate,
} from './createCommand/createInit';

const setupQuestions = {
  chooseTemplate,
  askProjectName,
  askProjectVersion,
  askProjectHomepage,
  askProjectDescription,
  askLicenseName,
  askLicenseUrl,
  askInstallCommand,
  askTestCommand,
  askProjectDocumentationUrl,
  askAuthorName,
  askAuthorGithub,
  askAuthorTwitter,
  askAuthorPatreon,
  askProjectPrerequisites,
  askContributing,
  askUsage,
};

export {
  setupQuestions,
  removeFiles,
  validateRemove,
  removeRequired,
  removeOptional,
  createFiles,
  createRequired,
  createOptional,
  selectFileToCreate,
};
