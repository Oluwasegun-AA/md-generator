
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

/**
 * @description
 * Takes an array of objects and return an array of the value in the name key of each object
 *
 * @param {Array} filesArray array of objects with a name key
 */
const getFullFileNames = filesArray =>
  flatMap(filesArray, currentFile => currentFile.name);


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
