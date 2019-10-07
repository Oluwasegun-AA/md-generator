const getFullFileNames = filesArray =>
  filesArray.flatMap(currentFile => currentFile.name);

const createFiles = files => ({
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
  createOptional
};
