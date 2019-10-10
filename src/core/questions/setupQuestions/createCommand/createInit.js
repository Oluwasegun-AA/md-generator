import {
  castElementsToFormatedString,
  getFullFileNames,
} from '../../../../common/index';

/**
 * @description
 * Question to validate files creation
 *
 * @param {Array} files files names array
 */
const createFiles = files => {
  const filesAsString = castElementsToFormatedString(getFullFileNames(files));
  return {
    type: 'confirm',
    name: 'createFiles',
    message: `Confirm you would like to create the following .md file(s)\n\n${filesAsString}`,
    default: false,
  };
};

/**
 * @description
 * create files Question
 *
 * @param {Array} files files names array
 */
const selectFileToCreate = files => ({
  type: 'checkbox',
  name: 'createFiles',
  message: 'Which of the following .md files would you like to create?\n',
  choices: [...getFullFileNames(files)],
});

/**
 * @description
 * create files Question
 *
 * @param {Array} files files names array
 */
const createEmptyFiles = () => ({
  type: 'confirm',
  name: 'empty',
  message: 'Would you like the created file(s) to be empty?\n',
  choices: false,
});

/**
 * @description
 * create required files Question
 *
 * @param {Array} files required files names array
 */
const createRequired = files => ({
  type: 'checkbox',
  name: 'createFiles',
  message:
    'Which of the following REQUIRED .md files would you like to create?\n',
  choices: [...getFullFileNames(files)],
});

/**
 * @description
 * create optional files Question
 *
 * @param {Array} files optional files names array
 */
const createOptional = files => ({
  type: 'checkbox',
  name: 'createFiles',
  message:
    'Which of the following OPTIONAL .md files would you like to create?\n',
  choices: [...getFullFileNames(files)],
});

/**
 * @description
 * create optional files Question
 *
 * @param {Array} files optional files names array
 */
const overrideFiles = files => {
  const filesAsString = castElementsToFormatedString(files);
  return {
    type: 'confirm',
    name: 'override',
    message: `The following file(s) exists,\n${filesAsString}\nwould you like to override?\n`,
    choices: false,
  };
};

export {
  createFiles,
  createRequired,
  createOptional,
  selectFileToCreate,
  createEmptyFiles,
  overrideFiles,
};
