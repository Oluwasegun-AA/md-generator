import {
  castElementsToFormatedString,
  getFullFileNames,
} from '../../../../common/index';
import { ICurrentFile, IQuestionResponse } from '../../../../../types/typeDeclarations.interface';

/**
 * @description
 * Question to validate files creation
 *
 * @param files files names array
 */
const createFiles = (files: ICurrentFile[]): IQuestionResponse => {
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
 * @param files files names array
 */
const selectFileToCreate = (files: ICurrentFile[]): IQuestionResponse => ({
  type: 'checkbox',
  name: 'createFiles',
  message: 'Which of the following .md files would you like to create?\n',
  choices: [...getFullFileNames(files)],
});

/**
 * @description
 * create files Question
 *
 * @param files files names array
 */
const createEmptyFiles = (): any => ({
  type: 'confirm',
  name: 'empty',
  message: 'Would you like the created file(s) to be empty?\n',
  default: false,
});

/**
 * @description
 * create required files Question
 *
 * @param files required files names array
 */
const createRequired = (files: ICurrentFile[]): IQuestionResponse => ({
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
 * @param files optional files names array
 */
const createOptional = (files: ICurrentFile[]) => ({
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
 * @param files optional files names array
 */
const overrideFiles = (files: string[]): any => {
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
