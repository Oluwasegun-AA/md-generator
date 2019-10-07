import askProjectName from './project-name';
import askProjectVersion from './project-version';
import askProjectDescription from './project-description';
import askProjectHomepage from './project-homepage';
import askProjectDocumentationUrl from './project-documentation-url';
import askAuthorName from './author-name';
import askAuthorGithub from './author-github';
import askAuthorTwitter from './author-twitter';
import askAuthorPatreon from './author-patreon';
import askProjectPrerequisites from './project-prerequisites';
import askLicenseName from './license-name';
import askLicenseUrl from './license-url';
import askContributing from './contributing';
import askInstallCommand from './install-command';
import askUsage from './usage';
import askTestCommand from './test-command';
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
} from './createCommand/createInit';

export {
  askProjectName,
  askProjectVersion,
  askProjectDescription,
  askProjectHomepage,
  askProjectDocumentationUrl,
  askAuthorName,
  askAuthorGithub,
  askAuthorTwitter,
  askAuthorPatreon,
  askProjectPrerequisites,
  askLicenseName,
  askLicenseUrl,
  askContributing,
  askInstallCommand,
  askUsage,
  askTestCommand,
  removeFiles,
  validateRemove,
  removeRequired,
  removeOptional,
  createFiles,
  createRequired,
  createOptional,
};
