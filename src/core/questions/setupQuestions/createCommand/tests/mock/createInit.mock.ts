import { ICurrentFile } from 'types/typeDeclarations.interface';

const files: ICurrentFile[] = [{
  name: 'README.md',
  exists: true,
  path: './README.md',
}, {
  name: 'LICENSE',
  exists: false,
  path: './LICENSE',
}, {
  name: 'CODE_OF_CONDUCT.md',
  exists: false,
  path: './CODE_OF_CONDUCT.md',
  templatePath: '../../templates/files/required/template-CODE_OF_CONDUCT.md'
}, {
  name: 'PULL_REQUEST_TEMPLATE.md',
  exists: false,
  path: './.github/PULL_REQUEST_TEMPLATE.md',
  templatePath: '../../templates/files/required/template-PULL_REQUEST_TEMPLATE.md'
}, {
  name: 'bug_report.md',
  exists: false,
  path: './.github/ISSUE_TEMPLATE/bug_report.md',
  templatePath: '../../templates/files/required/template-BUG_REPORT.md'
}, {
  name: 'feature_request.md',
  exists: true,
  path: './.github/ISSUE_TEMPLATE/feature_request.md',
  templatePath: '../../templates/files/required/template-FEATURE_REQUEST.md'
}];

export default files;
