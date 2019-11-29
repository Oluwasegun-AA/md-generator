import { IProjectInfos, IQuestionResponse } from "../../../../types/typeDeclarations.interface";

const documentationUrl = (projectInfos: IProjectInfos): IQuestionResponse => ({
  type: 'input',
  message: '  Project documentation URL (use empty value to skip)',
  name: 'projectDocumentationUrl',
  default: projectInfos.documentationUrl,
});

export default documentationUrl;
