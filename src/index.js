import getProjectInfos from './projectEnv/projectInfo';
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
const start = async (useDefaultAnswers) => {
  const projectInformations = await getProjectInfos();
  const answersContext = await askQuestions(
    projectInformations,
    useDefaultAnswers
  );
  return answersContext;
};

export default start;
