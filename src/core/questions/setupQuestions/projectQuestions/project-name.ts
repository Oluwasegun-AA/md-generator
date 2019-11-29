import { IQuestionResponse, IProjectInfos } from "../../../../types/typeDeclarations.interface";

const projectName = (projectInfos: IProjectInfos): IQuestionResponse => ({
  type: 'input',
  message: '  Project name',
  name: 'projectName',
  default: projectInfos.name,
});

export default projectName;
