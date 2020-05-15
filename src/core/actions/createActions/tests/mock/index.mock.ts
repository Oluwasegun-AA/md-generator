const required = {
  required: true,
  optional: false
};

const optional = {
  required: false,
  optional: true
};

export const currentFile = {
  name: 'file',
  exists: true,
  path: '/path/to/file',
  templatePath: '/path/to/template'
};

const file = {
  required: false,
  optional: false,
  isEmpty: true,
  file: ['readme'],
  resp: {
    name: 'README.md',
    exists: true,
    path: './README.md',
  },
  LICENSE: {
    name: 'LICENSE',
    exists: false,
    path: './LICENSE',
  },
  CODE_OF_CONDUCT: {
    name: 'CODE_OF_CONDUCT.md',
    exists: false,
    path: './CODE_OF_CONDUCT.md',
    templatePath: '../../templates/files/required/template-CODE_OF_CONDUCT.md'
  },
  PULL_REQUEST_TEMPLATE: {
    name: 'PULL_REQUEST_TEMPLATE.md',
    exists: false,
    path: './.github/PULL_REQUEST_TEMPLATE.md',
    templatePath: '../../templates/files/required/template-PULL_REQUEST_TEMPLATE.md'
  },
  BUG_REPORT: {
    name: 'bug_report.md',
    exists: false,
    path: './.github/ISSUE_TEMPLATE/bug_report.md',
    templatePath: '../../templates/files/required/template-BUG_REPORT.md'
  },
  FEATURE_REQUEST: {
    name: 'feature_request.md',
    exists: true,
    path: './.github/ISSUE_TEMPLATE/feature_request.md',
    templatePath: '../../templates/files/required/template-FEATURE_REQUEST.md'
  },
};

const none = {
  required: false,
  optional: false,
};

export {
  required,
  optional,
  file,
  none
};
