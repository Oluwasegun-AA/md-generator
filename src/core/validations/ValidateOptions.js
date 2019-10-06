import { showHelp, ExtractOptions } from '../coreUtils/index';
import IsValidArgs from './IsInvalidArgs';
import Actions from '../actions/index';

const filterValidArgs = args =>
  Object.keys(args).filter(item => args[item] !== undefined);

const validateOptions = values => {
  const command = values._name;
  const args = ExtractOptions[command](values);
  const activeArgs = filterValidArgs(args);
  if (!IsValidArgs[command](activeArgs)) showHelp('Invalid argument combination\n');
  Actions[command](activeArgs, values);
};

export default validateOptions;
