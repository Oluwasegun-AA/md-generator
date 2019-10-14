import inquirer from 'inquirer';

import {
  createFiles,
  createRequired,
  createOptional,
  selectFileToCreate,
  createEmptyFiles,
  overrideFiles,
} from '../../questions/setupQuestions/index';
import {
  spinner,
  fileNotDetectedAlert,
  unrecognizedFileAlert,
  getFullFileNames,
  showEndMessage,
  useHelpAlert,
} from '../../../common/index';
import { getInfos } from '../../questions/askQuestions';
import { buildFileContent, writeFile } from '../../../templates/fileWriter';
import {
  allFiles,
  requiredFiles,
  optionalFiles,
  getArrayOfValues,
  queryFilesExistence,
  getItemFromFileName,
} from '../actionsUtils';

/**
 * @description
 * return all files to be created based on the choice of the user to override the existing file
 *
 * @param {*} existingFiles
 * @param {*} noneExistingFiles
 */
const shouldOverride = async (existingFiles, noneExistingFiles) => {
  const files = await inquirer
    .prompt(overrideFiles(existingFiles))
    .then(item => {
      const { override } = item;
      if (override) return noneExistingFiles.concat(existingFiles);
      return noneExistingFiles;
    });
  return files;
};

const getValidFiles = values => {
  const list =
    typeof values[0] === 'object' ? getFullFileNames(values) : values;
  const { foundFiles, filesNotFound } = queryFilesExistence(list);
  const validFileNames = filesNotFound.filter(key =>
    Object.keys(allFiles).includes(key));
  const inValidFileNames = filesNotFound.filter(
    key => !Object.keys(allFiles).includes(key)
  );
  return {
    validFileNames,
    inValidFileNames,
    foundFiles,
  };
};
/**
 * @description
 * handles files override for existimng files based on the user's choice
 *
 * @param {*} values
 */
const handleOverride = async values => {
  let { validFileNames } = getValidFiles(values);
  const { inValidFileNames, foundFiles } = getValidFiles(values);
  if (foundFiles.length > 0) {
    validFileNames = await shouldOverride(foundFiles, validFileNames);
  }
  return { validFileNames, inValidFileNames };
};

/**
 * @description
 * Creates Files
 *
 * @param {Boolean} USE_DEFAULT determines if questions are asked or default values are used
 * @param {Array} filesToBeCreated file names (Array of strings)
 * @param {Boolean} isEmpty determines if file to be created would be empty
 */
const createMdFiles = async (USE_DEFAULT, filesToBeCreated, isEmpty) => {
  const { validFileNames } = await handleOverride(filesToBeCreated);
  if (validFileNames.length === 0) {
    useHelpAlert();
    process.exit(1);
  }
  filesToBeCreated = validFileNames;
  console.log('fafa', filesToBeCreated)
  await getInfos(USE_DEFAULT).then(projectInfos => {
    filesToBeCreated.forEach(async file => {
      let pathToTemplate;
      const { path, templatePath } = getItemFromFileName(file);
      console.log('lll', path)
      console.log('llljkk', templatePath)
      if (file === 'LICENSE') {
        pathToTemplate = projectInfos.licenseName.path;
      } else {
        pathToTemplate = templatePath || projectInfos.templatePath;
      }
      const fileContent = isEmpty
        ? ''
        : await buildFileContent(projectInfos, pathToTemplate);
      writeFile(fileContent, path);
    });
  });
  spinner().succeed('File(s) created Successfully\n');
  showEndMessage();
};

/**
 * @description
 * determine which file creation mode is activated with respect to the type of files
 *
 * @param {Array} allFiles all files array
 * @param {Object} mode Question modes
 * @param {Boolean} CREATE_EMPTY_FILE determines if questions are asked or default values are used
 */
const processCreation = async (allItems, mode, IS_EMPTY_FILE) => {
  const USE_DEFAULT_VALUES = true;
  let CREATE_EMPTY_FILE = false;
  let filesToBeCreated;
  return inquirer.prompt(mode(getArrayOfValues(allItems))).then(answer => {
    const { createFiles } = answer;
    if (createFiles === false) return process.exit(1);
    inquirer.prompt(createEmptyFiles()).then(res => {
      CREATE_EMPTY_FILE = IS_EMPTY_FILE || res.empty;
      if (typeof createFiles === 'object') {
        filesToBeCreated = Object.values(allItems).filter(file =>
          createFiles.includes(file.name));
        if (
          createFiles.includes('README.md') ||
          createFiles.includes('CODE_OF_CONDUCT.md') ||
          createFiles.includes('LICENSE')
        ) {
          return createMdFiles(
            !USE_DEFAULT_VALUES,
            filesToBeCreated,
            CREATE_EMPTY_FILE
          );
        }
      }
      if (createFiles === true) {
        return createMdFiles(USE_DEFAULT_VALUES, allItems, CREATE_EMPTY_FILE);
      }
      return createMdFiles(USE_DEFAULT_VALUES, createFiles, CREATE_EMPTY_FILE);
    });
  });
  // createMdFiles(USE_DEFAULT, allItems, IS_EMPTY_FILE);
};

/**
 * @description
 * Check if files to be created is a valid .md file, exists in codebase, or doesn't exist.
 *
 * @param {Array} values Array of files names
 */
const checkCreatableFiles = async values => {
  const { validFileNames, inValidFileNames, foundFiles } = getValidFiles(
    values
  );
  let validFiles = validFileNames.concat(foundFiles);
  if (inValidFileNames.length > 0) {
    unrecognizedFileAlert(inValidFileNames);
  }
  if (validFiles.length > 0) {
    validFiles = Object.values(allFiles).filter(item =>
      validFiles.includes(item.name.split('.')[0]));
  } else {
    fileNotDetectedAlert();
    process.exit(1);
  }
  return validFiles;
};

/**
 * @description creates file when command is passed with out options
 */
const createNonSpecificFiles = () => {
  processCreation(allFiles, selectFileToCreate);
};

/**
 * @description creates files when command is passed with option -F or --file
 * @param {Boolean} isEmpty determines if questions are asked or default values are used
 * @param {Array} values Files names (array of string)
 */
const createSpecificFiles = async (isEmpty, values) => {
  const files = await checkCreatableFiles(values);
  processCreation(files, createFiles, isEmpty);
};

/**
 * @description
 * Creates files when command is passed with option -R or --required
 *
 * @param {Boolean} isEmpty determines if questions are asked or default values are used
 */
const createRequiredFiles = isEmpty => {
  processCreation(requiredFiles, createRequired, isEmpty);
};

/**
 * @description
 * Creates files when command is passed with option -O or --optional
 *
 * @param {Boolean} isEmpty determines if questions are asked or default values are used
 */
const createOptionalFiles = isEmpty => {
  processCreation(optionalFiles, createOptional, isEmpty);
};

/**
 * @description
 * handles file creation
 *
 * @param {Array} values arguments i.e command, payload and command options
 */
const createHandler = values => {
  const {
    file,
    required,
    optional,
    isEmpty,
    resp
  } = values;
  if (file) return createSpecificFiles(isEmpty, resp);
  if (required) return createRequiredFiles(isEmpty);
  if (optional) return createOptionalFiles(isEmpty);
  createNonSpecificFiles(isEmpty);
};

export default createHandler;
