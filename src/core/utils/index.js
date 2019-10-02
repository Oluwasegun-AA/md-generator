/* eslint-disable no-undef */
import program from 'commander';
import boxen from 'boxen';
import { log } from '../../utils';

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
  console.log(option);
  if (NO_COMMAND_SPECIFIED) {
    showHelp(`Invalid Option: ${option}`);
  }
};

const useBox = text => {
  log(
    boxen(text, { padding: 3, margin: 1, borderStyle: 'double' }),
    program.args.join(' ')
  );
};

class ExtractOptions {
  static list(args) {
    const { optional, required } = args;
    return { optional, required };
  }

  static create(args) {
    const { optional, required, all, file, empty } = args;
    return {
      optional,
      required,
      all,
      file,
      empty,
    };
  }

  static check() {
    return {};
  }

  static remove(args) {
    const { all, file } = args;
    return {
      all,
      file,
    };
  }

  static import(args) {
    const { all, file, empty } = args;
    return {
      all,
      file,
      empty,
    };
  }
}

export { showHelpOnError, useBox, showHelp, ExtractOptions };
