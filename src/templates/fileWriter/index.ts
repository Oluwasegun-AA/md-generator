import ejs from 'ejs';
import { getYear } from 'date-fns';
import fs from 'fs';
import { unescape } from 'lodash';
import { promisify } from 'util';
import { dirname } from 'path';
import mkdirp from 'mkdirp';
import { log } from '../../common/index';
import { IProjectInfos } from '../../types/typeDeclarations.interface';

/**
 * @description writes file and makes parent directories if required
 *
 * @param path path to file
 * @param text content to be written
 */
const writeFile = (text: string, path: string): void => {
  const errMsg = () => log(`${path.split('/').pop()} creation unsuccessful`);
  return mkdirp(dirname(path), (err: any) => {
    if (err) return errMsg();
    fs.writeFile(path, unescape(text), (e: any) => {
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
  const currentYear: number = getYear(new Date());
  const template: string = await getFileTemplate(templatePath);

  return ejs.render(template, {
    filename: templatePath,
    currentYear,
    ...context,
  });
};

export { writeFile, buildFileContent };
