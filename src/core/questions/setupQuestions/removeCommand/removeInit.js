import { getFullFileNames } from '../../../../common/index';

const removeFiles = files => ({
  type: 'checkbox',
  name: 'removeFiles',
  message: 'Which of the following files would you like to delete?\n',
  choices: [...getFullFileNames(files)],
});

const validateRemove = files => ({
  type: 'confirm',
  name: 'removeFiles',
  message: `Are you sure you would like to delete the following .md file(s)? \n\n${files}`,
  default: false,
});

const removeRequired = files => ({
  type: 'checkbox',
  name: 'removeFiles',
  message:
    'Which of the following REQUIRED .md files would you like to delete?\n',
  choices: [...getFullFileNames(files)],
});

const removeOptional = files => ({
  type: 'checkbox',
  name: 'removeFiles',
  message:
    'Which of the following OPTIONAL .md files would you like to delete?\n',
  choices: [...getFullFileNames(files)],
});

export {
  removeFiles,
  validateRemove,
  removeRequired,
  removeOptional
};
