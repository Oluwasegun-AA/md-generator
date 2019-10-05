import boxen from 'boxen';
import pad from 'pad';

const log = (item, payload = '') => {
  process.stdout.write(`\n${item}`);
  process.stdout.write(`${payload}`);
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

const customHelp = () => {
  log('\nCommand-Options :');
  log('Usage: md-generator [commands] [command-options]\n');
  log(pad('-A, --all', 26), 'Operate on all required/optional .md files');
  log(pad('-F, --file', 26), 'Operate on specific .md files');
  log(pad('-E, --empty', 26), 'make added files empty');
  log(pad('-R --required', 26), 'Operate on required files');
  log(pad('-O --optional', 26), 'Operate on optional files');
};
export { log, useBox, customHelp };
