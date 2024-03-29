import { flatMap } from 'lodash';
import {
  log,
  useBox,
  green,
  customHelp,
  whiteUnderline,
  red,
  gray,
  dimWhite,
  cyan,
  wrongCommandAlert,
  noCommandAlert,
  spinner,
  useHelpAlert,
  showEndMessage,
  fileNotDetectedAlert,
  unrecognizedFileAlert,
  checkCommunityStandardMet,
  castElementsToFormatedString,
} from './alerts';

import { ICurrentFile } from '../../types/typeDeclarations.interface';

/**
 * @description
 * Takes an array of objects and return an array of the value in the name key of each object
 *
 * @param filesArray array of objects with a name key
 */
const getFullFileNames = (filesArray: ICurrentFile[]): string[] =>
  flatMap(filesArray, (currentFile: ICurrentFile) => currentFile.name);

export {
  log,
  useBox,
  green,
  customHelp,
  whiteUnderline,
  red,
  gray,
  dimWhite,
  cyan,
  wrongCommandAlert,
  noCommandAlert,
  spinner,
  useHelpAlert,
  showEndMessage,
  getFullFileNames,
  fileNotDetectedAlert,
  unrecognizedFileAlert,
  checkCommunityStandardMet,
  castElementsToFormatedString,
};
