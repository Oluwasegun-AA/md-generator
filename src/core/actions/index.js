import pad from 'pad';
import { log, cyan, whiteUnderline } from '../../common/index';
import {
  requiredFiles,
  optionalFiles,
  check,
  removeNonSpecific,
  removeSpecificFiles,
  removeRequiredFiles,
  removeOptionalFiles,
  createNonSpecificFiles,
  createSpecificFiles,
  createRequiredFiles,
  createOptionalFiles,
} from './actionsUtils';

const username = 'username';
const repoName = 'repoName';

const listFiles = values => {
  const { required, optional } = values;
  const all = !optional && !required;
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
  log(pad('\nDo remember to add a description to your repository.'));
  log(
    `You can check community standards met via https://github.com/${username}/${repoName}/community \n`
  );
};

const checkFiles = values => {
  const { required, optional } = values;
  const all = !optional && !required;
  if (required || all) {
    log(whiteUnderline('Required Files :\n'));
    check(requiredFiles);
  }
  if (optional || all) {
    log(whiteUnderline('Optional Files :\n'));
    check(optionalFiles);
  }
};

const removeFiles = values => {
  const {
    file,
    required,
    optional,
    resp
  } = values;
  if (required) return removeRequiredFiles(resp);
  if (optional) return removeOptionalFiles(resp);
  if (file) return removeSpecificFiles(resp);
  removeNonSpecific(resp);
};

const getArgs = (args, option) => args.find(item => item === option);

const getValues = (args, resp) => ({
  file: getArgs(args, 'file'),
  required: getArgs(args, 'required'),
  optional: getArgs(args, 'optional'),
  all: getArgs(args, 'all'),
  empty: getArgs(args, 'empty'),
  resp,
});

const createFiles = values => {
  const {
    file,
    required,
    optional,
    resp
  } = values;
  if (file) return createSpecificFiles(resp);
  if (required) return createRequiredFiles(resp);
  if (optional) return createOptionalFiles(resp);
  createNonSpecificFiles();
};
class Actions {
  static list(args, resp) {
    const values = getValues(args, resp);
    listFiles(values);
  }

  static create(args, resp) {
    const values = getValues(args, resp);
    createFiles(values);
  }

  static async check(args, resp) {
    const values = getValues(args, resp);
    checkFiles(values);
  }

  static remove(args, resp) {
    const values = getValues(args, resp);
    removeFiles(values);
  }
}

export default Actions;
