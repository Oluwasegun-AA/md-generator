import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import pad from 'pad';
import {
  removeFiles,
  validateRemove,
  removeRequired,
  removeOptional,
  createFiles,
  createRequired,
  createOptional,
} from '../questions/setupQuestions/index';
import {
  log,
  red,
  gray,
  green,
  cyan,
  dimWhite,
  useBox,
} from '../../common/index';
import start from '../../index';

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
    templatePath: getResolvedPath(
      '../../templates/files/required/template-CODE_OF_CONDUCT.md'
    ),
  },
  PULL_REQUEST_TEMPLATE: {
    name: 'PULL_REQUEST_TEMPLATE.md',
    exists: checkFileExist('../../../.github/PULL_REQUEST_TEMPLATE.md'),
    path: getResolvedPath('../../../.github/PULL_REQUEST_TEMPLATE.md'),
    templatePath: getResolvedPath(
      '../../templates/files/required/template-PULL_REQUEST_TEMPLATE.md'
    ),
  },
  BUG_REPORT: {
    name: 'bug_report.md',
    exists: checkFileExist('../../../.github/ISSUE_TEMPLATE/bug_report.md'),
    path: getResolvedPath('../../../.github/ISSUE_TEMPLATE/bug_report.md'),
    templatePath: getResolvedPath(
      '../../templates/files/required/template-BUG_REPORT.md'
    ),
  },
  FEATURE_REQUEST: {
    name: 'feature_request.md',
    exists: checkFileExist(
      '../../../.github/ISSUE_TEMPLATE/feature_request.md'
    ),
    path: getResolvedPath('../../../.github/ISSUE_TEMPLATE/feature_request.md'),
    templatePath: getResolvedPath(
      '../../templates/files/required/template-FEATURE_REQUEST.md'
    ),
  },
};

const optionalFiles = {
  CHANGELOG: {
    name: 'CHANGELOG.md',
    exists: checkFileExist('../../../CHANGELOG.md'),
    path: getResolvedPath('../../../CHANGELOG.md'),
    templatePath: getResolvedPath(
      '../../templates/files/optional/template-CHANGELOG.md'
    ),
  },
  SUPPORT: {
    name: 'SUPPORT.md',
    exists: checkFileExist('../../../SUPPORT.md'),
    path: getResolvedPath('../../../SUPPORT.md'),
    templatePath: getResolvedPath(
      '../../templates/files/optional/template-SUPPORT.md'
    ),
  },
  CONTRIBUTORS: {
    name: 'CONTRIBUTORS.md',
    exists: checkFileExist('../../../CONTRIBUTORS.md'),
    path: getResolvedPath('../../../CONTRIBUTORS.md'),
    templatePath: getResolvedPath(
      '../../templates/files/optional/template-CONTRIBUTORS.md'
    ),
  },
  AUTHORS: {
    name: 'AUTHORS.md',
    exists: checkFileExist('../../../AUTHORS.md'),
    path: getResolvedPath('../../../AUTHORS.md'),
    templatePath: getResolvedPath(
      '../../templates/files/optional/template-AUTHORS.md'
    ),
  },
  ACKNOWLEDGMENTS: {
    name: 'ACKNOWLEDGMENTS.md',
    exists: checkFileExist('../../../ACKNOWLEDGMENTS.md'),
    path: getResolvedPath('../../../ACKNOWLEDGMENTS.md'),
    templatePath: getResolvedPath(
      '../../templates/files/optional/template-ACKNOWLEDGMENTS.md'
    ),
  },
  CODEOWNERS: {
    name: 'CODEOWNERS.md',
    exists: checkFileExist('../../../CODEOWNERS.md'),
    path: getResolvedPath('../../../CODEOWNERS.md'),
    templatePath: getResolvedPath(
      '../../templates/files/optional/template-CODEOWNERS.md'
    ),
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
    });
  });
  useBox('File(s) removed successfully \nThanks for using md-generator');
};

const deleteFiles = (ValidFilesArray, allFiles) => {
  if (ValidFilesArray.length === 0)
    return log('Error: No file selected, Please select a file\n');
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
      dimWhite(pad(`${file[key].name}`, 28)),
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

const allFileNames = (files = allFiles) =>
  Object.values(files).flatMap(item => item);

const processRemoval = (selectedFiles, filesInfo, mode) => {
  if (selectedFiles.length === 0)
    return log('The desired .md file(s) not found in the codebase\n');
  inquirer.prompt(mode(selectedFiles)).then(answer => {
    const selectedFiles = removeDotMdAttribute(answer.removeFiles);
    deleteFiles(selectedFiles, filesInfo);
  });
};

const removeNonSpecific = () => {
  processRemoval(allExistingFiles(), allFiles, removeFiles);
};

const queryFilesExistence = values => {
  const args = values.parent.rawArgs[4];
  if (!args || args.length === 0) {
    return log(
      'Error: File names not detected, please supply file names i.e --file "README.md CONTRIBUTING.md" \n'
    );
  }
  const data = args.split(' ');
  return checkFilesExist(data, allFiles);
};
const removeSpecificFiles = values => {
  const { foundFiles, filesNotFound } = queryFilesExistence(values);
  if (filesNotFound.length > 0) {
    const filesList = concatFiles(filesNotFound);
    log('The following file(s) were not found :\n', `${filesList} \n`);
  }
  if (foundFiles.length > 0) {
    deleteFiles(foundFiles, allFiles);
  }
};

const removeRequiredFiles = () => {
  processRemoval(
    allExistingFiles(requiredFiles),
    requiredFiles,
    removeRequired
  );
};

const removeOptionalFiles = () => {
  processRemoval(
    allExistingFiles(optionalFiles),
    optionalFiles,
    removeOptional
  );
};

const processCreation = async (allFiles, mode) => {
  let projectInfos;
  const USE_DEFAULT = true;
  const templatePath = undefined;
  inquirer.prompt(mode(allFileNames(allFiles))).then(answer => {
    if (
      answer.createFiles.includes('README.md') ||
      answer.createFiles.includes('CODE_OF_CONDUCT.md')
    ) {
      projectInfos = start();
    } else projectInfos = start(templatePath, USE_DEFAULT);
    if (projectInfos) {
      console.log('evi', projectInfos);
      // answer.createFiles.forEach(file => {
      //   fs.writeFile(allFiles[file.split('.')[0]].path, 'Hello World', err => {
      //     if (err) log('file not created');
      //   });
      // });
      // useBox('File(s) created successfully\nThank you for using md-generator');
    }
  });
};

const createNonSpecificFiles = () => {
  processCreation(allFiles, createFiles);
  // console.log(requiredFiles.README.templatePath)
};

const createSpecificFiles = values => {
  const { foundFiles, filesNotFound } = queryFilesExistence(values);
  const validFileNames = filesNotFound.filter(key =>
    Object.keys(allFiles).includes(key)
  );
  const inValidFileNames = filesNotFound.filter(
    key => !Object.keys(allFiles).includes(key)
  );
  if (inValidFileNames.length > 0) {
    log(
      `The following .md file(s) is/are not recognized as one of the required/optional .md files\n${concatFiles(
        inValidFileNames
      )}`
    );
  }
  if (foundFiles.length > 0) {
    const filesList = concatFiles(foundFiles);
    log(
      'The following .md file(s) already exist in the codebase :\n',
      `${filesList} \n`
    );
  }
  if (validFileNames.length > 0) {
    const validFiles = Object.values(allFiles).filter(item =>
      validFileNames.includes(item.name.split('.')[0])
    );
    processCreation(validFiles, createFiles);
  }
};

const createRequiredFiles = () => {
  processCreation(requiredFiles, createRequired);
};

const createOptionalFiles = () => {
  processCreation(optionalFiles, createOptional);
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
  removeSpecificFiles,
  createNonSpecificFiles,
  createSpecificFiles,
  createRequiredFiles,
  createOptionalFiles,
};
