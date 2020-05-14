import isEmpty from 'lodash/isEmpty';
import { IProjectInfos, IQuestionResponse, IProjectInfosWithMissingFields } from '../../../../../types/typeDeclarations.interface';

const licenseUrl = (projectInfos: IProjectInfos | IProjectInfosWithMissingFields): IQuestionResponse => ({
  type: 'input',
  message: '  License URL (use empty value to skip)',
  name: 'licenseUrl',
  default: projectInfos.licenseUrl,
  when: (answersContext: any) => !isEmpty(answersContext.licenseName),
});

export default licenseUrl;
