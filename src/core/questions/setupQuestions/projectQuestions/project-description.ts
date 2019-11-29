import { IQuestionResponse, IProjectInfos } from "../../../../types/typeDeclarations.interface";

const projectDescription = (projectInfos: IProjectInfos): IQuestionResponse => ({
  type: 'input',
  message: '  Project description',
  name: 'projectDescription',
  default: projectInfos.description,
});

export default projectDescription;
