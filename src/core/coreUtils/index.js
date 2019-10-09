import program from 'commander';
import { log } from '../../common';

const showHelp = text => {
  log(text);
  program.help();
  process.exit(1);
};

const showHelpOnError = type => {
  const option = type.parent.rawArgs[3];
  const NO_COMMAND_SPECIFIED = Object.keys(program.opts()).every(
    key => program.opts()[`${key}`] === undefined || key === 'version'
  );
  if (NO_COMMAND_SPECIFIED) {
    showHelp(`Invalid Option: ${option}`);
  }
};

class ExtractOptions {
  static list(args) {
    const { optional, required } = args;
    return { optional, required };
  }

  static create(args) {
    const {
      optional,
      required,
      all,
      file,
      empty
    } = args;
    return {
      optional,
      required,
      all,
      file,
      empty,
    };
  }

  static check(args) {
    const { optional, required } = args;
    return { optional, required };
  }

  static remove(args) {
    const {
      all,
      file,
      required,
      optional
    } = args;
    return {
      all,
      file,
      required,
      optional
    };
  }
}

export { showHelpOnError, showHelp, ExtractOptions };
