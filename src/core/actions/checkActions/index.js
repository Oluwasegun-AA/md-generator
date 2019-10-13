import pad from 'pad';
import getInfos from '../../../projectEnv/projectInfo';
import {
  log,
  red,
  gray,
  green,
  dimWhite,
  spinner,
  whiteUnderline,
  checkCommunityStandardMet
} from '../../../common/index';
import {
  requiredFiles,
  optionalFiles
} from '../actionsUtils';

/**
 * @description
 * Check if .md file exists in the codebase
 *
 * @param {*} file file name
 */
const check = file => {
  Object.keys(file).forEach(key => {
    if (!file[key].exists) {
      return log(
        pad(red(' X '), 12),
        gray(pad(`${file[key].name}`, 27), 'Not found')
      );
    }
    return log(
      pad(green(' √ '), 12),
      dimWhite(pad(`${file[key].name}`, 28)),
      'exists'
    );
  });
  log('\n');
};

/**
 * @description
 * List all required/optional .md files present in the codebase
 *
 * @param {*} values arguments i.e command and command options
 */
const checkHandler = async values => {
  const spin = spinner('Checking for all Required / Optional .md files . . .');
  const { required, optional } = values;
  const all = !optional && !required;
  const USE_DEFAULT = true;
  await getInfos(USE_DEFAULT).then(projectInfos => {
    spin.succeed('Done');
    const { githubUsername, name } = projectInfos;
    if (required || all) {
      log(whiteUnderline('Required Files :\n'));
      check(requiredFiles);
    }
    if (optional || all) {
      log(whiteUnderline('Optional Files :\n'));
      check(optionalFiles);
    }
    checkCommunityStandardMet(githubUsername, name);
  });
};

export default checkHandler;
