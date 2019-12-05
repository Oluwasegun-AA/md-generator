import { ICurrentFile } from 'types/typeDeclarations.interface';

const filesArray: ICurrentFile[] = [
  {
    name: 'README.md',
    exists: false,
    path: './README.md',
  },
  {
    name: 'CODE_OF_CONDUCT.md',
    exists: false,
    path: './CODE_OF_CONDUCT.md',
    templatePath: '../../templates/files/required/template-CODE_OF_CONDUCT.md',
  }
];

export default filesArray;
