import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { IProjectInfos, IQuestionResponse } from '../../../../types/typeDeclarations.interface';

/**
 * @description Return engines as formatted choices
 */
const buildFormattedChoices = (engines: any) => {
  const choices = isNil(engines)
    ? null
    : Object.keys(engines).map((key: string) => ({
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
 */
const hasProjectInfosEngines = (projectInfos: IProjectInfos) =>
  !isNil(projectInfos.engines) && !isEmpty(projectInfos.engines);

const prerequisites = (projectInfos: IProjectInfos): IQuestionResponse => ({
  type: 'checkbox',
  message: '  Project prerequisites',
  name: 'projectPrerequisites',
  choices: buildFormattedChoices(projectInfos.engines),
  when: () => hasProjectInfosEngines(projectInfos),
});

export default prerequisites;
