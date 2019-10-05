import pad from 'pad';
import chalk from 'chalk';
import { log, green, whiteUnderline } from '../../utils/index';

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
class Actions {
  static list(args) {
    const optional = args.find(item => item === 'optional');
    const required = args.find(item => item === 'required');
    const all = !optional && !required;
    listFiles(required, optional, all);
  }

  static create() {
    console.log('create');
  }

  static check() {
    console.log('check');
  }

  static remove() {
    console.log('remove');
  }

  static import() {
    console.log('import');
  }
}

export default Actions;
