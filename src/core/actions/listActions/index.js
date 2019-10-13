import pad from 'pad';
import getInfos from '../../../projectEnv/projectInfo';
import {
  log,
  cyan,
  spinner,
  whiteUnderline,
  checkCommunityStandardMet
} from '../../../common/index';

/**
 * @description
 * List available .m files i.e required and/or optional
 *
 * @param {Object} values rguments i.e command and command options
 */
const listHandler = async values => {
  const spin = spinner('Generating Requested List . . .');
  const { required, optional } = values;
  const all = !optional && !required;
  const USE_DEFAULT = true;
  await getInfos(USE_DEFAULT).then(projectInfos => {
    spin.succeed('Done');
    const { authorGithubUsername, projectName } = projectInfos;
    if (required || all) {
      log(
        whiteUnderline(
          'Required .md files needed to meet community standards :\n'
        )
      );
      log(pad('📘', 5), cyan('README.md'));
      log(pad('📘', 5), cyan('LICENSE'));
      log(pad('📘', 5), cyan('CODE_OF_CONDUCT.md'));
      log(pad('📘', 5), cyan('PULL_REQUEST_TEMPLATE.md'));
      log(pad('📘', 5), cyan('CONTRIBUTING.md'));
      log(pad('📘', 5), cyan('bug_report.md'));
      log(pad('📘', 5), cyan('feature_request.md'));
    }
    if (optional || all) {
      log(whiteUnderline('\n Optional .md files :\n'));
      log(pad('📘', 5), cyan('CHANGELOG.md'));
      log(pad('📘', 5), cyan('SUPPORT.md'));
      log(pad('📘', 5), cyan('CONTRIBUTORS.md'));
      log(pad('📘', 5), cyan('AUTHORS.md'));
      log(pad('📘', 5), cyan('ACKNOWLEDGMENTS.md'));
      log(pad('📘', 5), cyan('CODEOWNERS.md'));
    }
    log('\nDo remember to add a description to your repository.');
    checkCommunityStandardMet(authorGithubUsername, projectName);
  });
};

export default listHandler;
