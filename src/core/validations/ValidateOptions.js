import program from 'commander';
import { showHelp, ExtractOptions } from '../utils/index';
import { log } from '../../utils/index';
import IsValidArgs from './IsInvalidArgs';

const filterValidArgs = args => {
  return Object.keys(args).filter(item => args[item] !== undefined);
};

const validateOptions = type => {
  const command = type._name;
  log('command', command);
  const args = ExtractOptions[command](type);
  const activeArgs = filterValidArgs(args);
  log('activeArgs', activeArgs);
  if (!IsValidArgs[command](activeArgs)) showHelp('Invalid argument combination');
};

export default validateOptions;
