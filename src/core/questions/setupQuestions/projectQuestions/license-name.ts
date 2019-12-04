import path from 'path';
import { IQuestionResponse } from '../../../../../types/typeDeclarations.interface';

const getResolvedPath = (relativePath: string) => path.resolve(__dirname, relativePath);

const MIT = getResolvedPath(
  '../../../../templates/files/required/template-MIT-LICENSE.md'
);
const ISC = getResolvedPath(
  '../../../../templates/files/required/template-ISC-LICENSE.md'
);
const GNU = getResolvedPath(
  '../../../../templates/files/required/template-GNU-LICENSE.md'
);
const APACHE = getResolvedPath(
  '../../../../templates/files/required/template-APACHE-LICENSE.md'
);
const MOZILLA = getResolvedPath(
  '../../../../templates/files/required/template-MOZILLA-LICENSE.md'
);

const licenseName = (): IQuestionResponse => ({
  type: 'list',
  message: '  License name',
  name: 'licenseName',
  choices: [
    {
      name: 'MIT',
      value: { name: 'MIT', path: MIT },
    },
    {
      name: 'ISC',
      value: { name: 'ISC', path: ISC },
    },
    {
      name: 'GNU',
      value: { name: 'GNU', path: GNU },
    },
    {
      name: 'APACHE',
      value: { name: 'APACHE', path: APACHE },
    },
    {
      name: 'MOZILLA',
      value: { name: 'MOZILLA', path: MOZILLA },
    },
  ],
});

export default licenseName;
