import { showHelp, ExtractOptions } from '../utils/index';
import IsValidArgs from './IsInvalidArgs';

const filterValidArgs = args => Object.keys(args).filter(item => args[item] !== undefined);

const validateOptions = type => {
  const command = type._name;
  const args = ExtractOptions[command](type);
  const activeArgs = filterValidArgs(args);
  if (!IsValidArgs[command](activeArgs)) showHelp('Invalid argument combination\n');
};

export default validateOptions;
