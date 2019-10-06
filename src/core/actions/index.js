import pad from 'pad';
import { log, green, whiteUnderline } from '../../utils/index';
import {
  allFiles,
  requiredFiles,
  optionalFiles,
  concatFiles,
  deleteFiles,
  check,
  checkFilesExist,
  removeNonSpecific,
  removeRequiredFiles,
  removeOptionalFiles,
} from './actionsUtils';

const username = 'username';
const repoName = 'repoName';

const listFiles = (required, optional, all) => {
  if (required || all) {
    log(
      whiteUnderline(
        'Required .md files needed to meet community standards :\n'
      )
    );
    log(pad('📘', 5), green('README.md'));
    log(pad('📘', 5), green('LICENSE'));
    log(pad('📘', 5), green('CODE_OF_CONDUCT.md'));
    log(pad('📘', 5), green('PULL_REQUEST_TEMPLATE.md'));
    log(pad('📘', 5), green('bug_report.md'));
    log(pad('📘', 5), green('feature_request.md'));
  }
  if (optional || all) {
    log(whiteUnderline('\n Optional .md files :\n'));
    log(pad('📘', 5), green('CHANGELOG.md'));
    log(pad('📘', 5), green('SUPPORT.md'));
    log(pad('📘', 5), green('CONTRIBUTORS.md'));
    log(pad('📘', 5), green('AUTHORS.md'));
    log(pad('📘', 5), green('ACKNOWLEDGMENTS.md'));
    log(pad('📘', 5), green('CODEOWNERS.md'));
  }
  log(pad('\nDo remember to add a description to your repository.'));
  log(
    `You can check community standards met via https://github.com/${username}/${repoName}/community \n`
  );
};

const handleSpecificDelete = values => {
  const args = values.parent.rawArgs[4];
  if (!args || args.length === 0) {
    return log(
      'Error: File names not detected, please supply file names i.e --file "README.md CONTRIBUTING.md" \n'
    );
  }
  const data = args.split(' ');
  const filesStatus = checkFilesExist(data, allFiles);
  const { foundFiles, filesNotFound } = filesStatus;
  if (filesNotFound.length > 0) {
    const filesList = concatFiles(filesNotFound);
    log('The following file(s) were not found :\n', `${filesList} \n`);
  }
  if (foundFiles.length > 0) {
    deleteFiles(foundFiles, allFiles);
  }
};

const checkFiles = (required, optional, all) => {
  if (required || all) {
    log(whiteUnderline('Required Files :\n'));
    check(requiredFiles);
  }
  if (optional || all) {
    log(whiteUnderline('Optional Files :\n'));
    check(optionalFiles);
  }
};

const removeFiles = (file, required, optional, resp) => {
  if (file) return handleSpecificDelete(resp);
  if (required) return removeRequiredFiles(resp);
  if (optional) return removeOptionalFiles(resp);
  removeNonSpecific(resp);
};

class Actions {
  static list(args) {
    const optional = args.find(item => item === 'optional');
    const required = args.find(item => item === 'required');
    const all = !optional && !required;
    listFiles(required, optional, all);
  }

  static create() {
    log('create');
  }

  static async check(args) {
    const optional = args.find(item => item === 'optional');
    const required = args.find(item => item === 'required');
    const all = !optional && !required;
    checkFiles(required, optional, all);
  }

  static remove(args, resp) {
    const file = args.find(item => item === 'file');
    const required = args.find(item => item === 'required');
    const optional = args.find(item => item === 'optional');
    removeFiles(file, required, optional, resp);
  }

  static import() {
    log('import');
  }
}

export default Actions;
