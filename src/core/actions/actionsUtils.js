import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import pad from 'pad';
import {
  removeFiles,
  validateRemove,
  removeRequired,
  removeOptional,
} from '../questions/setupQuestions/index';
import {
  log,
  red,
  gray,
  green,
  cyan,
  dimWhite,
  useBox,
} from '../../utils/index';

const getResolvedPath = relativePath => path.resolve(__dirname, relativePath);

const checkFileExist = relativePath => {
  const resolvedPath = getResolvedPath(relativePath);
  return !!fs.existsSync(resolvedPath);
};

const requiredFiles = {
  README: {
    name: 'README.md',
    exists: checkFileExist('../../../README.md'),
    path: getResolvedPath('../../../README.md'),
  },
  LICENSE: {
    name: 'LICENSE',
    exists: checkFileExist('../../../LICENSE'),
    path: getResolvedPath('../../../LICENSE'),
  },
  CODE_OF_CONDUCT: {
    name: 'CODE_OF_CONDUCT.md',
    exists: checkFileExist('../../../CODE_OF_CONDUCT.md'),
    path: getResolvedPath('../../../CODE_OF_CONDUCT.md'),
  },
  PULL_REQUEST_TEMPLATE: {
    name: 'PULL_REQUEST_TEMPLATE.md',
    exists: checkFileExist('../../../.github/PULL_REQUEST_TEMPLATE.md'),
    path: getResolvedPath('../../../.github/PULL_REQUEST_TEMPLATE.md'),
  },
  bug_report: {
    name: 'bug_report.md',
    exists: checkFileExist('../../../.github/ISSUE_TEMPLATE/bug_report.md'),
    path: getResolvedPath('../../../.github/ISSUE_TEMPLATE/bug_report.md'),
  },
  feature_request: {
    name: 'feature_request.md',
    exists: checkFileExist(
      '../../../.github/ISSUE_TEMPLATE/feature_request.md'
    ),
    path: getResolvedPath('../../../.github/ISSUE_TEMPLATE/feature_request.md'),
  },
};

const optionalFiles = {
  CHANGELOG: {
    name: 'CHANGELOG.md',
    exists: checkFileExist('../../../CHANGELOG.md'),
    path: getResolvedPath('../../../CHANGELOG.md'),
  },
  SUPPORT: {
    name: 'SUPPORT.md',
    exists: checkFileExist('../../../SUPPORT.md'),
    path: getResolvedPath('../../../SUPPORT.md'),
  },
  CONTRIBUTORS: {
    name: 'CONTRIBUTORS.md',
    exists: checkFileExist('../../../CONTRIBUTORS.md'),
    path: getResolvedPath('../../../CONTRIBUTORS.md'),
  },
  AUTHORS: {
    name: 'AUTHORS.md',
    exists: checkFileExist('../../../AUTHORS.md'),
    path: getResolvedPath('../../../AUTHORS.md'),
  },
  ACKNOWLEDGMENTS: {
    name: 'ACKNOWLEDGMENTS.md',
    exists: checkFileExist('../../../ACKNOWLEDGMENTS.md'),
    path: getResolvedPath('../../../ACKNOWLEDGMENTS.md'),
  },
  CODEOWNERS: {
    name: 'CODEOWNERS.md',
    exists: checkFileExist('../../../CODEOWNERS.md'),
    path: getResolvedPath('../../../CODEOWNERS.md'),
  },
};

const allFiles = { ...requiredFiles, ...optionalFiles };

const concatFiles = filesArray => {
  let files = '';
  filesArray.forEach(
    file => (files += `${cyan(pad('-', 2))} ${dimWhite(`${file}`)}\n`)
  );
  return files;
};

const deleteFromCodebase = (filesArray, allFiles) => {
  filesArray.forEach(file => {
    const { path } = allFiles[file];
    fs.unlink(path, err => {
      if (err) log(`Could not delete ${file}`);
      useBox('File(s) removed successfully \nThanks for using md-generator');
    });
  });
};

const deleteFiles = (ValidFilesArray, allFiles) => {
  if (ValidFilesArray.length === 0) return log('Error: No file selected, Please select a file\n');
  inquirer.prompt(validateRemove(concatFiles(ValidFilesArray))).then(answer => {
    const { removeFiles } = answer;
    if (removeFiles === true) {
      deleteFromCodebase(ValidFilesArray, allFiles);
    }
  });
};

const check = file => {
  Object.keys(file).forEach(key => {
    if (!file[key].exists) {
      return log(
        pad(red(' X '), 12),
        gray(pad(`${file[key].name}`, 27), 'Not found')
      );
    }
    return log(
      pad(green(' √ '), 12),
      dimWhite(pad(`${file[key].name}`, 27)),
      'exists'
    );
  });
  log('\n');
};

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

const removeDotMdAttribute = item => {
  const newItem = [];
  item.forEach(key => newItem.push(key.split('.')[0].toUpperCase()));
  return newItem;
};

const allExistingFiles = (files = allFiles) =>
  Object.values(files).filter(item => !!item.exists);

const processRemoval = (selectedFiles, filesInfo, mode) => {
  if (selectedFiles.length === 0) return log('The desired .md file(s) not found in the codebase\n');
  inquirer.prompt(mode(selectedFiles)).then(answer => {
    const selectedFiles = removeDotMdAttribute(answer.removeFiles);
    deleteFiles(selectedFiles, filesInfo);
  });
};

const removeNonSpecific = () => {
  processRemoval(allExistingFiles(), allFiles, removeFiles);
};

const removeRequiredFiles = () => {
  processRemoval(allExistingFiles(requiredFiles), requiredFiles, removeRequired);
};

const removeOptionalFiles = () => {
  processRemoval(allExistingFiles(optionalFiles), optionalFiles, removeOptional);
};

export {
  allFiles,
  requiredFiles,
  optionalFiles,
  concatFiles,
  check,
  checkFilesExist,
  deleteFiles,
  removeNonSpecific,
  removeRequiredFiles,
  removeOptionalFiles,
};
