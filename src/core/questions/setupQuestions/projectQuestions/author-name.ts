import { IProjectInfos, IQuestionResponse } from "../../../../../types/typeDeclarations.interface";

const authorName = (projectInfos: IProjectInfos): IQuestionResponse => ({
  type: 'input',
  message: '  Author\'s name',
  name: 'authorName',
  default: projectInfos.author,
});

export default authorName;
