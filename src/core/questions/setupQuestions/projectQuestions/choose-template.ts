
import path from 'path';
import { IQuestionResponse } from '../../../../../types/typeDeclarations.interface';

const getResolvedPath = (relativePath: string) => path.resolve(__dirname, relativePath);

const defaultTemplate = getResolvedPath('../../../../templates/files/required/template-html-README.md');
const defaultNoHtmlTemplate = getResolvedPath('../../../../templates/files/required/template-noHtml-README.md');

const chooseTemplate = (): IQuestionResponse => ({
  type: 'list',
  message:
    '  Use HTML in your README.md for a nicer rendering? (not supported everywhere. ex: Bitbucket)',
  name: 'templatePath',
  choices: [
    {
      name: 'Yes',
      value: defaultTemplate,
    },
    {
      name: 'No',
      value: defaultNoHtmlTemplate,
    },
  ],
});

export default chooseTemplate;
