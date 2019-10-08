import path from 'path';

const defaultTemplate = path.resolve(
  __dirname,
  '../../../../templates/files/required/template-html-README.md'
);
const defaultNoHtmlTemplate = path.resolve(
  __dirname,
  '../../../../templates/files/required/template-noHtml-README.md'
);

const chooseTemplate = () => ({
  type: 'list',
  message:
    '🎨  Use HTML in your README.md for a nicer rendering? (not supported everywhere. ex: Bitbucket)',
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
