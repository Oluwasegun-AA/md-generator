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
import { IAllFiles, ICurrentFile } from '../../../../types/typeDeclarations.interface';

/**
 * @description
 * Delete file from the codebase
 *
 * @param filesArray name of files to be deleted (array of strings)
 * @param allFiles All files Available files
 */
const deleteFromCodebase = (filesArray: string[], allFiles: any) => {
  filesArray.forEach((file: string) => {
    const { path }: ICurrentFile = allFiles[file];
    fs.unlink(path, (err: any) => {
      if (err) log(`Could not delete ${file}`);
    });
  });
  useBox('File(s) removed successfully \nThanks for using md-generator');
};

/**
 * @description
 * Handles the delete process, validating if no file is supplied
 *
 * @param validFilesArray name of Valid files to be deleted (array of strings)
 * @param allFiles All files Available files
 */
const deleteFiles = (validFilesArray: string[], allFiles: IAllFiles): void => {
  if (validFilesArray.length === 0) {
    return log('Error: No file selected, Please select a file\n');
  }
  inquirer
    .prompt(validateRemove(castElementsToFormatedString(validFilesArray)))
    .then((answer: any) => {
      const { removeFiles }: {removeFiles: boolean} = answer;
      if (removeFiles) {
        deleteFromCodebase(validFilesArray, allFiles);
      }
    });
};

/**
 * @description
 * Handles the delete process, validating if the filename is valid and if it exists
 *
 * @param selectedFiles All files parsed to be deleted
 * @param filesInfo All available files
 * @param mode Question mode
 */
const processRemoval = (selectedFiles: string[], filesInfo: IAllFiles, mode: any): void => {
  if (selectedFiles.length === 0) {
    return log('Error: .md file(s) not found in the codebase\n');
  }
  inquirer.prompt(mode(selectedFiles)).then((answer: any) => {
    const selectedFiles = removeDotMdAttribute(answer.removeFiles);
    deleteFiles(selectedFiles, filesInfo);
  });
};

/**
 * @description handles item removal when command is passed without an option
 */
const removeNonSpecific = (): void => {
  processRemoval(allExistingFiles(), allFiles, removeFiles);
};

/**
 * @description
 * Handles removal when command is passed with option -F or --file
 * @param values Array of file names supplied
 */
const removeSpecificFiles = (values: ICurrentFile[]): void => {
  const { foundFiles, filesNotFound } = queryFilesExistence(values);
  if (filesNotFound.length > 0) {
    const filesList: string = castElementsToFormatedString(filesNotFound);
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
const removeRequiredFiles = (): void => {
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
const removeOptionalFiles = (): void => {
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
 * @param values arguments i.e command, payload and command options
 */
const removeHandler = (values: any) => {
  const {
    file,
    required,
    optional,
    resp
  } = values;
  if (required) return removeRequiredFiles();
  if (optional) return removeOptionalFiles();
  if (file) return removeSpecificFiles(resp);
  removeNonSpecific();
};

export default removeHandler;
