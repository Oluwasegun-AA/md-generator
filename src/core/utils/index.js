import program from 'commander';
import boxen from 'boxen';
import { log } from '../../utils/index';

const showHelp = text => {
  log(text);
  program.help();
  process.exit(1);
};

const showHelpOnError = () => {
  const NO_COMMAND_SPECIFIED = Object.keys(program.opts()).every(
    key => program.opts()[`${key}`] === undefined || key === 'version'
  );
  if (NO_COMMAND_SPECIFIED) {
    showHelp('Invalid Command');
  }
};

const invalidArgs = args =>
  args.length > 2 ||
  !(
    (args.length === 2 && args.includes('all', 'empty')) ||
    args.includes('file', 'empty')
  );

const filterCurrentRequest = () => {
  const request = program.opts();
  const activeArgs = Object.keys(request).filter(
    item => item !== 'version' && request[item] !== undefined
  );
  if (invalidArgs(activeArgs)) showHelp('Invalid argument combination');
  log('active', activeArgs.length);
};

const useBox = text => {
  log(
    boxen(text, { padding: 3, margin: 1, borderStyle: 'double' }),
    program.args.join(' ')
  );
};

export { showHelpOnError, filterCurrentRequest, useBox };
