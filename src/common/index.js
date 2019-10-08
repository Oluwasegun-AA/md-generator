import boxen from 'boxen';
import pad from 'pad';
import chalk from 'chalk';
import ora from 'ora';

const { red, gray, green, cyan } = chalk;
const whiteUnderline = chalk.underline.rgb(174, 174, 174);
const dimWhite = chalk.rgb(174, 174, 174);

const log = (data1, data2 = '', data3 = '') => {
  process.stdout.write(`\n${data1}`);
  process.stdout.write(`${data2}`);
  process.stdout.write(`${data3}`);
};

const BOX_CONFIG = {
  padding: 1,
  margin: { top: 2, bottom: 3 },
  borderColor: 'cyan',
  align: 'center',
  borderStyle: 'double',
};

const useBox = text => {
  log(boxen(text, BOX_CONFIG));
};

const showEndMessage = () =>
  useBox('File(s) Created Successfully\nThank you for using md-generator');

const customHelp = () => {
  log('\nCommand-Options :');
  log('Usage: md-generator [commands] [command-options]\n');
  log(pad('-A, --all', 26), 'Operate on all required/optional .md files');
  log(pad('-F, --file', 26), 'Operate on specific .md files');
  log(pad('-E, --empty', 26), 'make added files empty');
  log(pad('-R --required', 26), 'Operate on required files');
  log(pad('-O --optional', 26), 'Operate on optional files');
};

const wrongCommandAlert = command => {
  return log(
    `Command "${command}" Does not Exist,\nPlease use --help to get the available commands\n`
  );
};

const noCommandAlert = () => {
  log(
    'Error: No Command Supplied. Please use --help to view the available Commands and Options\n'
  );
};

const spinnerStart = text => ora(text).start();
const spinnerStop = text => spinnerStart.succeed(text);

export {
  log,
  useBox,
  green,
  customHelp,
  whiteUnderline,
  red,
  gray,
  dimWhite,
  cyan,
  wrongCommandAlert,
  noCommandAlert,
  spinnerStart,
  spinnerStop,
  showEndMessage
};
