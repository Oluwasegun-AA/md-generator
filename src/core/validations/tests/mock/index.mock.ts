export const validArguments: any = {
  listAndCheck: [['required'], ['optional'], []],
  create: [
    ['required', 'empty'],
    ['optional', 'empty'],
    ['all', 'empty'],
    ['file', 'empty'],
    ['all'],
    ['file'],
    ['optional'],
    ['required'],
    []
  ],
  remove: [
    ['all'],
    ['file'],
    ['optional'],
    ['required'],
    []
  ]
};
