import { castElementsToFormatedString, getFullFileNames } from '../../../../common/index';

const createFiles = files => {
  const filesAsString = castElementsToFormatedString(getFullFileNames(files));
  return {
    type: 'confirm',
    name: 'createFiles',
    message: `Confirm you would like to create the following .md file(s)\n\n${filesAsString}`,
    default: false,
  };
};

const selectFileToCreate = files => ({
  type: 'checkbox',
  name: 'createFiles',
  message: 'Which of the following .md files would you like to create?\n',
  choices: [...getFullFileNames(files)],
});


const createRequired = files => ({
  type: 'checkbox',
  name: 'createFiles',
  message:
    'Which of the following REQUIRED .md files would you like to create?\n',
  choices: [...getFullFileNames(files)],
});

const createOptional = files => ({
  type: 'checkbox',
  name: 'createFiles',
  message:
    'Which of the following OPTIONAL .md files would you like to create?\n',
  choices: [...getFullFileNames(files)],
});

export {
  createFiles,
  createRequired,
  createOptional,
  selectFileToCreate
};
