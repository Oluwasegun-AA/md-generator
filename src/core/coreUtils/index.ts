import program from 'commander';
import { log } from '../../common';
import { IArguments } from '../../../types/typeDeclarations.interface';

/**
 * @description
 * log help text to the terminal
 *
 * @param text custom preliminary string to be logged
 */
const showHelp = (text: string): void => {
  log(text);
  program.help();
  process.exit(1);
};

/**
 * @description
 * logs help message on wrong arguments
 *
 * @param type response payload
 */
const showHelpOnError = (type: any): void => {
  const option = type.parent.rawArgs[3];
  const NO_COMMAND_SPECIFIED = Object.keys(program.opts()).every(
    (key: string) => program.opts()[`${key}`] === undefined || key === 'version'
  );
  if (NO_COMMAND_SPECIFIED) {
    showHelp(`Invalid Option: ${option}`);
  }
};

/**
 * Extract all needed options in each mode
 */
class ExtractOptions {
  public static list: any = (args: any): IArguments => {
    const { optional, required }: any = args;
    return { optional, required };
  };

  public static create: any = (args: any): IArguments => {
    const {
      optional,
      required,
      all,
      file,
      empty
    }: any = args;
    return {
      optional,
      required,
      all,
      file,
      empty,
    };
  };

  public static check = (args: any): IArguments => {
    const { optional, required }: any = args;
    return { optional, required };
  };

  public static remove = (args: any): IArguments => {
    const {
      all,
      file,
      required,
      optional
    }: any = args;
    return {
      all,
      file,
      required,
      optional
    };
  };
}

export { showHelpOnError, showHelp, ExtractOptions };
