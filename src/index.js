import readme from './templates/fileWriter/readme';
import infos from './project-env/project-info';
import utils from './utils';
import askQuestions from './core/questions/askQuestions';

/**
 * Main process:
 * 1) Get README template path
 * 2) Gather project infos
 * 3) Ask user questions
 * 4) Build README content
 * 5) Create README.md file
 *
 * @param {Object} args
 */
const start = async ({ customTemplatePath, useDefaultAnswers }) => {
  const templatePath = await readme.getReadmeTemplatePath(
    customTemplatePath,
    useDefaultAnswers
  );
  const projectInformations = await infos.getProjectInfos();
  const answersContext = await askQuestions(
    projectInformations,
    useDefaultAnswers
  );
  const readmeContent = await readme.buildReadmeContent(
    answersContext,
    templatePath
  );

  await readme.writeReadme(readmeContent);

  utils.showEndMessage();
};

export default start;
