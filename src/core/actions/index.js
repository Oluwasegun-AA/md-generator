import pad from 'pad';
import fs from 'fs';
import path from 'path';
import {
  log,
  green,
  whiteUnderline,
  red,
  gray,
  dimWhite,
} from '../../utils/index';

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

const checkFileExist = relativePath => {
  const resolvedPath = path.resolve(__dirname, relativePath);
  return !!fs.existsSync(resolvedPath);
};

const requiredFiles = {
  README: {
    name: 'README.md',
    exists: checkFileExist('../../../README.md'),
  },
  LICENSE: {
    name: 'LICENSE',
    exists: checkFileExist('../../../LICENSE'),
  },
  CODE_OF_CONDUCT: {
    name: 'CODE_OF_CONDUCT.md',
    exists: checkFileExist('../../../CODE_OF_CONDUCT.md'),
  },
  PULL_REQUEST_TEMPLATE: {
    name: 'PULL_REQUEST_TEMPLATE.md',
    exists: checkFileExist('../../../.github/PULL_REQUEST_TEMPLATE.md'),
  },
  bug_report: {
    name: 'bug_report.md',
    exists: checkFileExist('../../../.github/ISSUE_TEMPLATE/bug_report.md'),
  },
  feature_request: {
    name: 'feature_request.md',
    exists: checkFileExist(
      '../../../.github/ISSUE_TEMPLATE/feature_request.md'
    ),
  },
};

const optionalFiles = {
  CHANGELOG: {
    name: 'CHANGELOG.md',
    existis: checkFileExist('../../../CHANGELOG.md'),
  },
  SUPPORT: {
    name: 'SUPPORT.md',
    existis: checkFileExist('../../../SUPPORT.md'),
  },
  CONTRIBUTORS: {
    name: 'CONTRIBUTORS.md',
    existis: checkFileExist('../../../CONTRIBUTORS.md'),
  },
  AUTHORS: {
    name: 'AUTHORS.md',
    existis: checkFileExist('../../../AUTHORS.md'),
  },
  ACKNOWLEDGMENTS: {
    name: 'ACKNOWLEDGMENTS.md',
    existis: checkFileExist('../../../ACKNOWLEDGMENTS.md'),
  },
  CODEOWNERS: {
    name: 'CODEOWNERS.md',
    existis: checkFileExist('../../../CODEOWNERS.md'),
  },
};

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
      dimWhite(pad(`${file[key].name}`, 27)),
      'exists'
    );
  });
  log('\n');
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

  static remove() {
    log('remove');
  }

  static import() {
    log('import');
  }
}

export default Actions;
