import fs from 'fs';
import path from 'path';
import { fileNotDetectedAlert } from '../../common/index';

/**
 * @description
 * gets the absolute path a file
 *
 * @param {String} relativePath relative path to the file
 */
const getResolvedPath = relativePath => path.resolve(__dirname, relativePath);

/**
 * @description
 * Returns the activated command line option
 *
 * @param {Array} args all arguments available
 * @param {String} option option activated
 */
const getArgs = (args, option) => args.find(item => item === option);

/**
 * @description
 * returns an Object showing which option has been activated and the payload supplied
 *
 * @param {*} args all arguments available
 * @param {*} resp option activated
 */
const getValues = (args, resp) => ({
  file: getArgs(args, 'file'),
  required: getArgs(args, 'required'),
  optional: getArgs(args, 'optional'),
  all: getArgs(args, 'all'),
  isEmpty: getArgs(args, 'empty'),
  resp,
});

/**
 * @description
 * Checks if file exists in the code base
 *
 * @param {String} relativePath relative path to file
 */
const checkFileExist = relativePath => !!fs.existsSync(relativePath);

// required files Objects and their details
const requiredFiles = {
  README: {
    name: 'README.md',
    exists: checkFileExist('./README.md'),
    path: './README.md',
  },
  LICENSE: {
    name: 'LICENSE',
    exists: checkFileExist('./LICENSE'),
    path: './LICENSE',
  },
  CODE_OF_CONDUCT: {
    name: 'CODE_OF_CONDUCT.md',
    exists: checkFileExist('./CODE_OF_CONDUCT.md'),
    path: './CODE_OF_CONDUCT.md',
    templatePath: getResolvedPath(
      '../../templates/files/required/template-CODE_OF_CONDUCT.md'
    ),
  },
  PULL_REQUEST_TEMPLATE: {
    name: 'PULL_REQUEST_TEMPLATE.md',
    exists: checkFileExist('./.github/PULL_REQUEST_TEMPLATE.md'),
    path: './.github/PULL_REQUEST_TEMPLATE.md',
    templatePath: getResolvedPath(
      '../../templates/files/required/template-PULL_REQUEST_TEMPLATE.md'
    ),
  },
  BUG_REPORT: {
    name: 'bug_report.md',
    exists: checkFileExist('./.github/ISSUE_TEMPLATE/bug_report.md'),
    path: './.github/ISSUE_TEMPLATE/bug_report.md',
    templatePath: getResolvedPath(
      '../../templates/files/required/template-BUG_REPORT.md'
    ),
  },
  FEATURE_REQUEST: {
    name: 'feature_request.md',
    exists: checkFileExist('./.github/ISSUE_TEMPLATE/feature_request.md'),
    path: './.github/ISSUE_TEMPLATE/feature_request.md',
    templatePath: getResolvedPath(
      '../../templates/files/required/template-FEATURE_REQUEST.md'
    ),
  },
};

// optional files Objects and their details
const optionalFiles = {
  CHANGELOG: {
    name: 'CHANGELOG.md',
    exists: checkFileExist('./CHANGELOG.md'),
    path: './CHANGELOG.md',
    templatePath: getResolvedPath(
      '../../templates/files/optional/template-CHANGELOG.md'
    ),
  },
  SUPPORT: {
    name: 'SUPPORT.md',
    exists: checkFileExist('./SUPPORT.md'),
    path: './SUPPORT.md',
    templatePath: getResolvedPath(
      '../../templates/files/optional/template-SUPPORT.md'
    ),
  },
  CONTRIBUTORS: {
    name: 'CONTRIBUTORS.md',
    exists: checkFileExist('./CONTRIBUTORS.md'),
    path: './CONTRIBUTORS.md',
    templatePath: getResolvedPath(
      '../../templates/files/optional/template-CONTRIBUTORS.md'
    ),
  },
  AUTHORS: {
    name: 'AUTHORS.md',
    exists: checkFileExist('./AUTHORS.md'),
    path: './AUTHORS.md',
    templatePath: getResolvedPath(
      '../../templates/files/optional/template-AUTHORS.md'
    ),
  },
  ACKNOWLEDGMENTS: {
    name: 'ACKNOWLEDGMENTS.md',
    exists: checkFileExist('./ACKNOWLEDGMENTS.md'),
    path: './ACKNOWLEDGMENTS.md',
    templatePath: getResolvedPath(
      '../../templates/files/optional/template-ACKNOWLEDGMENTS.md'
    ),
  },
  CODEOWNERS: {
    name: 'CODEOWNERS.md',
    exists: checkFileExist('./CODEOWNERS.md'),
    path: './CODEOWNERS.md',
    templatePath: getResolvedPath(
      '../../templates/files/optional/template-CODEOWNERS.md'
    ),
  },
};

// all files Objects and their details
const allFiles = { ...requiredFiles, ...optionalFiles };

/**
 * @description
 * checks if file exists in the code base

 * @param {Array} data array of files names
 * @param {Object} allMdFiles Object containing all files available
 */
const checkFilesExist = (data, allMdFiles) => {
  const foundFiles = [];
  const filesNotFound = [];
  data.forEach(item => {
    const newItem = item.split('.')[0].toUpperCase();
    const file = Object.keys(allMdFiles).find(
      key => key === newItem && allMdFiles[newItem].exists
    );
    if (file) {
      foundFiles.push(file);
    } else {
      filesNotFound.push(newItem);
    }
  });
  return { foundFiles, filesNotFound };
};

/**
 * @description
 * remove the .md attribute of supplied in the terminal with the file name
 *
 * @param {Array} item Array of file names supplied
 */
const removeDotMdAttribute = item => {
  const newItem = [];
  item.forEach(key => newItem.push(key.split('.')[0].toUpperCase()));
  return newItem;
};

/**
 * @description
 * check if file name supplied is available in the npm module
 *
 * @param {Array} files Array of all file names supplied
 */
const allExistingFiles = (files = allFiles) =>
  Object.values(files).filter(item => !!item.exists);

const getArrayOfValues = (files = allFiles) => Object.values(files);

/**
 * @description
 * validate files names with respect to the files supported by the npm module
 *
 * @param {Array} values Array of all file names supplied
 */
const queryFilesExistence = values => {
  const args = !values.parent ? values.join(' ') : values.parent.rawArgs[4];
  if ((!args || args.length === 0) && values.parent) {
    fileNotDetectedAlert();
    process.exit(1);
  }
  const data = args.split(' ');
  return checkFilesExist(data, allFiles);
};

const getItemFromFileName = fileName =>
  Object.values(allFiles).find(value => value.name === fileName || `${fileName}.md`);

export {
  allFiles,
  getValues,
  requiredFiles,
  optionalFiles,
  checkFilesExist,
  getArrayOfValues,
  queryFilesExistence,
  allExistingFiles,
  removeDotMdAttribute,
  getItemFromFileName,
};
