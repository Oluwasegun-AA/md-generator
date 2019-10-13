import { getFullFileNames } from '../../../../common/index';

/**
 * @description
 * Return question for files removal
 *
 * @param {Array} files optional files names array
 */
const removeFiles = files => ({
  type: 'checkbox',
  name: 'removeFiles',
  message: 'Which of the following files would you like to delete?\n',
  choices: [...getFullFileNames(files)],
});

/**
 * @description
 * Return validation for files removal;
 *
 * @param {Array} files optional files names array
 */
const validateRemove = files => ({
  type: 'confirm',
  name: 'removeFiles',
  message: `Are you sure you would like to delete the following .md file(s)? \n\n${files}`,
  default: false,
});

/**
 * @description
 * Return question for required files removal
 *
 * @param {Array} files optional files names array
 */
const removeRequired = files => ({
  type: 'checkbox',
  name: 'removeFiles',
  message:
    'Which of the following REQUIRED .md files would you like to delete?\n',
  choices: [...getFullFileNames(files)],
});

/**
 * @description
 * Return question for optional files removal
 *
 * @param {Array} files optional files names array
 */
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
