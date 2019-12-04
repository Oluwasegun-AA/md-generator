import { getFullFileNames } from '../../../../common/index';
import { ICurrentFile, IQuestionResponse } from '../../../../../types/typeDeclarations.interface';

/**
 * @description
 * Return question for files removal
 *
 * @param files optional files names array
 */
const removeFiles = (files: ICurrentFile[]): any => ({
  type: 'checkbox',
  name: 'removeFiles',
  message: 'Which of the following files(s) would you like to delete?\n',
  choices: [...getFullFileNames(files)],
});

/**
 * @description
 * Return validation for files removal;
 *
 * @param files optional files names array
 */
const validateRemove = (files: ICurrentFile[]): any => ({
  type: 'confirm',
  name: 'removeFiles',
  message: `Are you sure you would like to delete the following .md file(s)? \n\n${files}`,
  default: false,
});

/**
 * @description
 * Return question for required files removal
 *
 * @param files optional files names array
 */
const removeRequired = (files: ICurrentFile[]): IQuestionResponse => ({
  type: 'checkbox',
  name: 'removeFiles',
  message:
    'Which of the following REQUIRED .md files(s) would you like to delete?\n',
  choices: [...getFullFileNames(files)],
});

/**
 * @description
 * Return question for optional files removal
 *
 * @param files optional files names array
 */
const removeOptional = (files: ICurrentFile[]): IQuestionResponse => ({
  type: 'checkbox',
  name: 'removeFiles',
  message:
    'Which of the following OPTIONAL .md files(s) would you like to delete?\n',
  choices: [...getFullFileNames(files)],
});

export {
  removeFiles,
  validateRemove,
  removeRequired,
  removeOptional
};
