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

import {IProjectInfos } from '../../../types/typeDeclarations.interface';

/**
 * @description
 * Check if .md file exists in the codebase
 *
 * @param file file name
 */
const check = (file: any): void => {
  Object.keys(file).forEach((key: string): void => {
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
 * @param values arguments i.e command and command options
 */
const checkHandler = async (values: Object): Promise<void> => {
  const spin: any = spinner('Checking for all Required / Optional .md files . . .');
  const { required, optional }: any = values;
  const all: boolean = !optional && !required;
  // const USE_DEFAULT: boolean = true;
  await getInfos().then((projectInfos: IProjectInfos) => {
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
