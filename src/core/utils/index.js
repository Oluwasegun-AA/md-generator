import program from 'commander';
import boxen from 'boxen';

const showHelpOnError = () => {
  const NO_COMMAND_SPECIFIED = Object.keys(program.opts()).every(
    key => program.opts()[`${key}`] === undefined || key === 'version'
  );
  if (NO_COMMAND_SPECIFIED) {
    console.log('Invalid command');
    return program.help();
  }
};

const filterCurrentRequest = () => {
  const request = program.opts();
  const filteredRequest = Object.keys(request).filter(
    item => item !== 'version'
  );
  const activeArgument = filteredRequest.find(item => request[item] !== undefined);
  console.log('active', activeArgument);
};

const useBox = text => {
  console.log(
    boxen(text, { padding: 3, margin: 1, borderStyle: 'double' }),
    program.args.join(' ')
  );
};

export { showHelpOnError, filterCurrentRequest, useBox };
