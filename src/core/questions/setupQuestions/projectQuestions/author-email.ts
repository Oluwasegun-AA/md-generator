import { IProjectInfos, IQuestionResponse } from '../../../../../types/typeDeclarations.interface';

const authorEmail = (projectInfos: IProjectInfos): IQuestionResponse => ({
  type: 'input',
  message: '  Author\'s email  or  Team\'s mail address',
  name: 'authorEmail',
  default: projectInfos.author,
});

export default authorEmail;
