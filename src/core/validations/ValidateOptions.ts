import { showHelp, ExtractOptions } from '../coreUtils/index';
import IsValidArgs from './IsInvalidArgs';
import Actions from '../actions/index';

/**
 * extract on ly valid options
 */
const filterValidArgs = (args: any): any =>
  Object.keys(args).filter((item: string) => args[item] !== undefined);

const validateOptions = (values: any): any => {
  const command: keyof typeof ExtractOptions = values._name;
  const args: any = ExtractOptions[command](values);
  const activeArgs: any = filterValidArgs(args);
  if (!IsValidArgs[command](activeArgs)) {
    showHelp('Invalid argument combination\n');
  }
  return { activeArgs, values };
};

const handleCommand = (argValues: any): void => {
  const command: keyof typeof Actions = argValues._name;
  const { activeArgs, values }: any = validateOptions(argValues);
  Actions[command](activeArgs, values);
};

export default handleCommand;
