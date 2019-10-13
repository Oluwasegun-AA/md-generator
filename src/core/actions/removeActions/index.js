import inquirer from 'inquirer';
import fs from 'fs';
import {
  allExistingFiles,
  removeDotMdAttribute,
  allFiles,
  requiredFiles,
  optionalFiles,
  queryFilesExistence,
} from '../actionsUtils';
import {
  removeFiles,
  validateRemove,
  removeRequired,
  removeOptional,
} from '../../questions/setupQuestions/index';
import {
  log,
  useBox,
  castElementsToFormatedString,
} from '../../../common/index';

/**
 * @description
 * Delete file from the codebase
 *
 * @param {Array} filesArray name of files to be deleted (array of strings)
 * @param {Array} allFiles All files Available files
 */
const deleteFromCodebase = (filesArray, allFiles) => {
  filesArray.forEach(file => {
    const { path } = allFiles[file];
    fs.unlink(path, err => {
      if (err) log(`Could not delete ${file}`);
    });
  });
  useBox('File(s) removed successfully \nThanks for using md-generator');
};

/**
 * @description
 * Handles the delete process, validating if no file is supplied
 *
 * @param {Array} ValidFilesArray name of Valid files to be deleted (array of strings)
 * @param {Array} allFiles All files Available files
 */
const deleteFiles = (ValidFilesArray, allFiles) => {
  if (ValidFilesArray.length === 0) {
    return log('Error: No file selected, Please select a file\n');
  }
  inquirer
    .prompt(validateRemove(castElementsToFormatedString(ValidFilesArray)))
    .then(answer => {
      const { removeFiles } = answer;
      if (removeFiles === true) {
        deleteFromCodebase(ValidFilesArray, allFiles);
      }
    });
};

/**
 * @description
 * Handles the delete process, validating if the filename is valid and if it exists
 *
 * @param {Array} selectedFiles All files parsed to be deleted
 * @param {Array} filesInfo All available files
 * @param {Object} mode Question mode
 */
const processRemoval = (selectedFiles, filesInfo, mode) => {
  if (selectedFiles.length === 0) {
    return log('The desired .md file(s) not found in the codebase\n');
  }
  inquirer.prompt(mode(selectedFiles)).then(answer => {
    const selectedFiles = removeDotMdAttribute(answer.removeFiles);
    deleteFiles(selectedFiles, filesInfo);
  });
};

/**
 * @description handles item removal when command is passed without an option
 */
const removeNonSpecific = () => {
  processRemoval(allExistingFiles(), allFiles, removeFiles);
};

/**
 * @description
 * Handles removal when command is passed with option -F or --file
 * @param {Array} values Array of file names supplied
 */
const removeSpecificFiles = values => {
  const { foundFiles, filesNotFound } = queryFilesExistence(values);
  if (filesNotFound.length > 0) {
    const filesList = castElementsToFormatedString(filesNotFound);
    log('The following file(s) were not found :\n', `${filesList} \n`);
  }
  if (foundFiles.length > 0) {
    deleteFiles(foundFiles, allFiles);
  }
};

/**
 * @description
 * handles files removals when the option -R or --required is used
 */
const removeRequiredFiles = () => {
  processRemoval(
    allExistingFiles(requiredFiles),
    requiredFiles,
    removeRequired
  );
};

/**
 * @description
 * handles files removals when the option -O or --optional is used
 */
const removeOptionalFiles = () => {
  processRemoval(
    allExistingFiles(optionalFiles),
    optionalFiles,
    removeOptional
  );
};

/**
 * @description
 * removes file in the codebase based on the arguments passed
 *
 * @param {Array} values arguments i.e command, payload and command options
 */
const removeHandler = values => {
  const {
    file,
    required,
    optional,
    resp
  } = values;
  if (required) return removeRequiredFiles(resp);
  if (optional) return removeOptionalFiles(resp);
  if (file) return removeSpecificFiles(resp);
  removeNonSpecific();
};

export default removeHandler;
