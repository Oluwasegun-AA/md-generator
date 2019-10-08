import inquirer from 'inquirer';
import path from 'path';

const chooseTemplate = async useDefaultAnswers => {
  const defaultTemplate = path.resolve(__dirname, '../../files/required/template-html-README.md');
  const defaultNoHtmlTemplate = path.resolve(
    __dirname,
    '../../files/required/template-noHtml-README.md'
  );

  if (useDefaultAnswers) return defaultTemplate;

  const question = {
    type: 'confirm',
    message:
      '🎨  Use HTML in your README.md for a nicer rendering? (not supported everywhere. ex: Bitbucket)',
    name: 'templatePath',
    choices: [
      {
        name: 'Yes ',
        value: defaultTemplate,
      },
      {
        name: 'No',
        value: defaultNoHtmlTemplate,
      },
    ],
  };

  const { templatePath } = await inquirer.prompt(question);

  return templatePath;
};

export default chooseTemplate;
