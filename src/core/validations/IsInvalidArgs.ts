/**
 * @description
 * converts array to string
 *
 * @param data array of information
 */
const str = (data: string[] | []) => JSON.stringify(data);

/**
 * @description
 * validates  strict equality between tow items
 * @param args raw arguments
 * @param validOptions valid options
 */
const isValidOption = (args: string[], validOptions: string[][]) =>
  !validOptions.every((option: string[] | []) => str(args) !== str(option));

/**
 * checks the validity of supplied arguments
 */
class IsValidArgs {
  public static list: any = (args: string[]): boolean => {
    const validArgs: string[][] = [['required'], ['optional'], []];
    return isValidOption(args, validArgs);
  }

  public static create: any = (args: string[]): boolean => {
    const validArgs = [
      ['required', 'empty'],
      ['optional', 'empty'],
      ['all', 'empty'],
      ['file', 'empty'],
      ['all'],
      ['file'],
      ['optional'],
      ['required'],
      []
    ];
    return isValidOption(args, validArgs);
  }

  public static check: any = (args: string[]): boolean => {
    const validArgs = [['required'], ['optional'], []];
    return isValidOption(args, validArgs);
  }

  public static remove: any = (args: string[]): boolean => {
    const validArgs = [
      ['all'],
      ['file'],
      ['optional'],
      ['required'],
      []];
    return isValidOption(args, validArgs);
  }
}

export default IsValidArgs;
