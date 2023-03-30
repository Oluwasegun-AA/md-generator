import ejs from 'ejs';
import fs from 'fs';
import { unescape } from 'lodash';
import { promisify } from 'util';
import { dirname } from 'path';
import { log } from '../../common/index';
import { IProjectInfos } from '../../../types/typeDeclarations.interface';


/**
 * @description writes file and makes parent directories if required
 *
 * @param path path to file
 * @param text content to be written
 */
const writeFile = (text: string, path: string): Promise<any> => {
  const errMsg = () => log(`${path.split('/').pop()} creation unsuccessful`);
  // @ts-ignore
  return fs.mkdir(dirname(path), (err: any): any => {
    if (err && err.code !== 'EEXIST') return errMsg();
    return fs.writeFile(path, unescape(text), (e: any): void => {
      if (e) errMsg();
    });
  });
};

/**
 * @description Get file template content from the given templatePath
 *
 * @param templatePath path to template
 */
const getFileTemplate = async (templatePath: string): Promise<string> => {
  try {
    const template = await promisify(fs.readFile)(templatePath, 'utf8');
    return template;
  } catch (err) {
    throw err;
  }
};

/**
 * @description create file content with the given context and templatePath
 * @param context Project information (project / user information)
 * @param templatePath path to template
 */
const buildFileContent = async (context: IProjectInfos, templatePath: string) => {
  const currentYear: number = new Date().getFullYear();
  const template: string = await getFileTemplate(templatePath);

  return ejs.render(template, {
    filename: templatePath,
    currentYear,
    ...context,
  });
};

export { writeFile, getFileTemplate, buildFileContent };
