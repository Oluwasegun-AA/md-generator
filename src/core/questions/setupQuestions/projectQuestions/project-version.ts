import { IProjectInfos, IQuestionResponse } from "../../../../../types/typeDeclarations.interface";

const projectVersion = (projectInfos: IProjectInfos): IQuestionResponse => ({
  type: 'input',
  message: '  Project version (use empty value to skip)',
  name: 'projectVersion',
  default: projectInfos.version,
});

export default projectVersion;
