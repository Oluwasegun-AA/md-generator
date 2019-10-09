import ejs from 'ejs';
import { getYear } from 'date-fns';
import fs from 'fs';
import { unescape } from 'lodash';
import { promisify } from 'util';
import { dirname } from 'path';
import mkdirp from 'mkdirp';
import { log } from '../../common/index';

/**
 * fs.writeFile but makes parent directories if required
 * @param {String} path
 * @param {String} text
 */
const writeFile = (text, path) => {
  const errMsg = () => log(`${path.split('/').pop()} creation unsuccessful`);
  return mkdirp(dirname(path), err => {
    if (err) errMsg();
    else {
      fs.writeFile(path, unescape(text), e => {
        if (e) errMsg();
      });
    }
  });
};

/**
 * @description Get file template content from the given templatePath
 * @param {string} templatePath
 */
const getFileTemplate = async templatePath => {
  try {
    const template = await promisify(fs.readFile)(templatePath, 'utf8');
    return template;
  } catch (err) {
    throw err;
  }
};

/**
 * @Build create file content with the given context and templatePath
 * @param {Object} context
 * @param {string} templatePath
 */
const buildFileContent = async (context, templatePath) => {
  const currentYear = getYear(new Date());
  const template = await getFileTemplate(templatePath);

  return ejs.render(template, {
    filename: templatePath,
    currentYear,
    ...context,
  });
};

export { writeFile, buildFileContent };
