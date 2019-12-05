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

import { ICurrentFile, ISortedFiles, IAllFiles } from '../../../../types/typeDeclarations.interface';

/**
 * @description
 * return all files to be created based on the choice of the user to override the existing file
 *
 * @param existingFiles -  files existing in the code base
 * @param noneExistingFiles - files not found in the codebase
 */
const shouldOverride: any = async (existingFiles: string[], noneExistingFiles: string[]): Promise<string[]> => {
  const files: string[] = await inquirer
    .prompt(overrideFiles(existingFiles))
    .then((item: any) => {
      const { override } = item;
      if (override) return noneExistingFiles.concat(existingFiles);
      return noneExistingFiles;
    });
  return files;
};

const getValidFiles: any = (values: ICurrentFile[] | string[]): any => {
  const list: string[] =
    typeof values[0] === 'object' ? getFullFileNames(values as ICurrentFile[]) : values as string[];
  const { foundFiles, filesNotFound }: ISortedFiles = queryFilesExistence(list);
  const validFileNames: string[] | ICurrentFile[] = filesNotFound.filter((key: string) =>
    Object.keys(allFiles).includes(key));
  const inValidFileNames: string[] | ICurrentFile[] = filesNotFound.filter(
    (key: string) => !Object.keys(allFiles).includes(key)
  );
  return {
    validFileNames,
    inValidFileNames,
    foundFiles,
  };
};

/**
 * @description
 * handles files override for existing files based on the user's choice
 *
 * @param values - files to be overridden
 */
const handleOverride: any = async (values: string[] | ICurrentFile[]): Promise<any> => {
  let { validFileNames }: ISortedFiles = getValidFiles(values);
  const { inValidFileNames, foundFiles }: ISortedFiles = getValidFiles(values);
  if (foundFiles.length > 0) {
    validFileNames = await shouldOverride(foundFiles, validFileNames);
  }
  return { validFileNames, inValidFileNames };
};

/**
 * @description
 * Creates Files
 *
 * @param USE_DEFAULT determines if questions are asked or default values are used
 * @param filesToBeCreated file names (Array of strings)
 * @param isEmpty determines if file to be created would be empty
 */
// tslint:disable-next-line: max-line-length
const createMdFiles = async (USE_DEFAULT: boolean, filesToBeCreated: string[] | ICurrentFile[], isEmpty: boolean): Promise<void> => {
  const { validFileNames }: ISortedFiles = await handleOverride(filesToBeCreated);
  if (validFileNames.length === 0) {
    useHelpAlert();
    process.exit(1);
  }
  // tslint:disable: no-parameter-reassignment
  const files: any = validFileNames;
  if (validFileNames.includes('README') || validFileNames.includes('LICENSE')) USE_DEFAULT = false;
  await getInfos(USE_DEFAULT, files).then((projectInfos: any) => {
    files.forEach(async (file: string | ICurrentFile) => {
      let pathToTemplate: string;
      const { path, templatePath }: ICurrentFile = getItemFromFileName(file as string);
      if (file === 'LICENSE') {
        pathToTemplate = projectInfos.licenseName.path;
      } else {
        pathToTemplate = templatePath || projectInfos.templatePath;
      }
      const fileContent: string = isEmpty
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
 * @param allItems all files array
 * @param mode Question modes
 * @param CREATE_EMPTY_FILE determines if questions are asked or default values are used
 */
// tslint:disable-next-line: max-line-length
const processCreation = async (allItems: IAllFiles | ICurrentFile[], mode: any, IS_EMPTY_FILE?: boolean): Promise<any> => {
  const USE_DEFAULT_VALUES: boolean = true;
  let CREATE_EMPTY_FILE: boolean = false;
  let filesToBeCreated: ICurrentFile[];
  return inquirer.prompt(mode(getArrayOfValues(allItems as IAllFiles)))
    .then((answer: any): any => {
      const { createFiles } = answer;
      if (createFiles === false) return process.exit(1);
      inquirer.prompt(createEmptyFiles()).then((res: any) => {
        CREATE_EMPTY_FILE = IS_EMPTY_FILE || res.empty;
        if (typeof createFiles === 'object') {
          filesToBeCreated = Object.values(allItems).filter((file: ICurrentFile) =>
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
          return createMdFiles(!USE_DEFAULT_VALUES, allItems as ICurrentFile[], CREATE_EMPTY_FILE);
        }
        return createMdFiles(USE_DEFAULT_VALUES, createFiles, CREATE_EMPTY_FILE);
      });
    });
};

/**
 * @description
 * Check if files to be created is a valid .md file, exists in codebase, or doesn't exist.
 *
 * @param values Array of files names
 */
const checkCreatableFiles = async (values: ICurrentFile[]): Promise<any[]> => {
  const { validFileNames, inValidFileNames, foundFiles }: ISortedFiles = getValidFiles(
    values
  );
  let validFiles: ICurrentFile[] | string[] = validFileNames.concat(foundFiles);
  if (inValidFileNames.length > 0) {
    unrecognizedFileAlert(inValidFileNames);
  }
  if (validFiles.length > 0) {
    validFiles = Object.values(allFiles).filter((item: any) =>
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
const createNonSpecificFiles = (): void => {
  processCreation(allFiles, selectFileToCreate);
};

/**
 * @description creates files when command is passed with option -F or --file
 * @param isEmpty determines if questions are asked or default values are used
 * @param values Files names
 */
const createSpecificFiles = async (isEmpty: boolean, values: ICurrentFile[]): Promise<void> => {
  const files = await checkCreatableFiles(values);
  processCreation(files, createFiles, isEmpty);
};

/**
 * @description
 * Creates files when command is passed with option -R or --required
 *
 * @param isEmpty determines if questions are asked or default values are used
 */
const createRequiredFiles = (isEmpty: boolean): void => {
  processCreation(requiredFiles, createRequired, isEmpty);
};

/**
 * @description
 * Creates files when command is passed with option -O or --optional
 *
 * @param isEmpty determines if questions are asked or default values are used
 */
const createOptionalFiles = (isEmpty: boolean): void => {
  processCreation(optionalFiles, createOptional, isEmpty);
};

/**
 * @description
 * handles file creation
 *
 * @param  values arguments i.e command, payload and command options
 */
const createHandler = (values: any): any => {
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
  createNonSpecificFiles();
};

export default createHandler;
