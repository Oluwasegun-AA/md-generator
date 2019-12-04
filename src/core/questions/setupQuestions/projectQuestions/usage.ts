import { IProjectInfos, IQuestionResponse } from "../../../../../types/typeDeclarations.interface";

const usageInfo = (projectInfos: IProjectInfos): IQuestionResponse => ({
  type: 'input',
  message: '  Usage command or instruction (use empty value to skip)',
  name: 'usage',
  default: projectInfos.usage,
});

export default usageInfo;
