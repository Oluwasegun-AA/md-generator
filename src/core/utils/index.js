import program from 'commander';
import boxen from 'boxen';
import { log } from '../../utils';

const showHelp = text => {
  log(text);
  program.help();
  process.exit(1);
};

const showHelpOnError = (option) => {
  const NO_COMMAND_SPECIFIED = Object.keys(program.opts()).every(
    key => program.opts()[`${key}`] === undefined || key === 'version'
  );
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

export { showHelpOnError, useBox, showHelp };
