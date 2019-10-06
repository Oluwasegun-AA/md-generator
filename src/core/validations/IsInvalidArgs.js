const str = data => JSON.stringify(data);

const isValidOption = (args, validOptions) =>
  !validOptions.every(option => str(args) !== str(option));

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
    const validArgs = [['all'], ['file'], []];
    return isValidOption(args, validArgs);
  }

  static import(args) {
    const validArgs = [
      ['optional'],
      ['required'],
      ['file', 'all'],
      ['all', 'file'],
      []
    ];
    return isValidOption(args, validArgs);
  }
}

export default IsValidArgs;
