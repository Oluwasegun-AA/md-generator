import readme from './templates/fileWriter/readme';
import getProjectInfos from './project-env/project-info';
import { showEndMessage } from './common/index';
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
const start = async (customTemplatePath, useDefaultAnswers) => {
  const projectInformations = await getProjectInfos();
  const answersContext = await askQuestions(
    projectInformations,
    useDefaultAnswers
  );

  // const readmeContent = await readme.buildReadmeContent(
  //   answersContext,
  //   answersContext.templatePath
  // );

  // await readme.writeReadme(readmeContent);

  // showEndMessage();
  // console.log( answersContext);
  return answersContext;
};

export default start;
