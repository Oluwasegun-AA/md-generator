/**
 * @description
 * converts array to string
 *
 * @param {Array} data array of information
 */
const str = data => JSON.stringify(data);

/**
 * @description
 * validates  strict equality between tow items
 * @param {Array} args
 * @param {Array} validOptions
 */
const isValidOption = (args, validOptions) =>
  !validOptions.every(option => str(args) !== str(option));

/**
 * @class
 * checks the validity of supplied arguments
 */
class IsValidArgs {
  static list(args) {
    const validArgs = [['required'], ['optional'], []];
    return isValidOption(args, validArgs);
  }

  static create(args) {
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

  static check(args) {
    const validArgs = [['required'], ['optional'], []];
    return isValidOption(args, validArgs);
  }

  static remove(args) {
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
