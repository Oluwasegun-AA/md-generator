import boxen from 'boxen';
import pad from 'pad';
import chalk from 'chalk';
import ora from 'ora';

// get chalk colors for terminal
const {
  red,
  gray,
  green,
  cyan
} = chalk;
const whiteUnderline = chalk.underline.rgb(174, 174, 174);
const dimWhite = chalk.rgb(174, 174, 174);

/**
 * @description
 *  Logs to the terminal
 *
 * @param {*} data1 data to be logged
 * @param {*} data2 data to be logged
 * @param {*} data3 data to be logged
 */
const log = (data1, data2 = '', data3 = '') => {
  process.stdout.write(`\n${data1}`);
  process.stdout.write(`${data2}`);
  process.stdout.write(`${data3}`);
};

// configuration for boxen
const BOX_CONFIG = {
  padding: 1,
  margin: { top: 2, bottom: 2 },
  borderColor: 'cyan',
  align: 'center',
  borderStyle: 'double',
};

/**
 * @description
 * Encapsulates Items logged in the console within a styled box
 * @param {String} text text to be printed on the terminal
 */
const useBox = text => {
  log(boxen(text, BOX_CONFIG));
};

/**
 * @description
 * Prints Success message after file creation
 */
const showEndMessage = () =>
  useBox('File(s) Created Successfully\nThank you for using md-generator');

/**
 * @description
 * Prints the custom help to the terminal
 */
const customHelp = () => {
  log('\nCommand-Options :');
  log('Usage: md-generator [commands] [command-options]\n');
  log(pad('-A, --all', 26), 'Operate on all required/optional .md files');
  log(pad('-F, --file', 26), 'Operate on specific .md files');
  log(pad('-E, --empty', 26), 'make added files empty');
  log(pad('-R --required', 26), 'Operate on required files');
  log(pad('-O --optional', 26), 'Operate on optional files\n');
};

/**
 * @description
 * prints to the wrong Command Alert to the terminal
 *
 * @param {String} command the command parsed
 */
const wrongCommandAlert = command =>
  log(
    `Command "${command}" Does not Exist,\nPlease use --help to get the available commands\n`
  );

/**
 * @description
 * prints to the no Command Alert to the terminal
 */
const noCommandAlert = () => {
  log(
    'Error: No Command Supplied. Please use --help to view the available Commands and Options\n'
  );
};

/**
 * @description
 * Shows spinner on the terminal
 *
 * @param {String} text text that accompany the spinner
 */
const spinner = text => ora(text).start();

/**
 * @description
 * Takes array of strings and returns a formatted list with the array elements
 *
 * @param {Array} filesArray Array of Strings
 */
const castElementsToFormatedString = filesArray => {
  let files = '';
  filesArray.forEach(
    file => (files += `${cyan(pad('-', 2))} ${dimWhite(`${file}`)}\n`)
  );
  return files;
};

/**
 * @description
 * logs link to github's community page if username and project name is available
 *
 * @param {*} authorGithubUsername GitHub username
 * @param {*} projectName project name
 */
const checkCommunityStandardMet = (authorGithubUsername, projectName) => {
  if (authorGithubUsername && projectName) {
    log(
      `You can check community standards met via https://github.com/${authorGithubUsername}/${projectName}/community \n`
    );
  } else {
    log(
      'You can check community standards met via https://github.com/"<GithubUsername>"/"<projectName>"/community \n'
    );
  }
};

/**
 * alert showing no file names supplied to the --files option
 */
const fileNotDetectedAlert = () => {
  log(
    'Error: File names not detected, please supply file names i.e --file "README.md CONTRIBUTING.md" \n'
  );
};

/**
 * Alert showing list of unsupported file names
 * @param {Array} inValidFileNamesArray
 */
const unrecognizedFileAlert = inValidFileNamesArray => {
  log(
    `The following file name(s) is/are not recognized as one of the required/optional .md files\n${castElementsToFormatedString(
      inValidFileNamesArray
    )}`
  );
};

/**
 * Alert directing users to the --help command
 */
const useHelpAlert = () =>
  log('File found, please user --help to check all supported md Files\n');

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
  spinner,
  useHelpAlert,
  showEndMessage,
  fileNotDetectedAlert,
  unrecognizedFileAlert,
  checkCommunityStandardMet,
  castElementsToFormatedString,
};
