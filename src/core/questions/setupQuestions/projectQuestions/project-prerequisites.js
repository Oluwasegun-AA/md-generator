import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

/**
 * @description Return engines as formatted choices
 * @param {Object} engines
 */
const buildFormattedChoices = engines => {
  const choices = isNil(engines)
    ? null
    : Object.keys(engines).map(key => ({
      name: `${key} ${engines[key]}`,
      value: {
        name: key,
        value: engines[key],
      },
      checked: true,
    }));
  return choices;
};

/**
 * Check if projectInfos has engines properties
 *å
 * @param {Object} projectInfos
 */
const hasProjectInfosEngines = projectInfos =>
  !isNil(projectInfos.engines) && !isEmpty(projectInfos.engines);

const prerequisites = projectInfos => ({
  type: 'checkbox',
  message: '  Project prerequisites',
  name: 'projectPrerequisites',
  choices: buildFormattedChoices(projectInfos.engines),
  when: () => hasProjectInfosEngines(projectInfos),
});

export default prerequisites;
