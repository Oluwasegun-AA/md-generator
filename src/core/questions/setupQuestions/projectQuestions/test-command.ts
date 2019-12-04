import { IProjectInfos, IQuestionResponse } from "../../../../../types/typeDeclarations.interface";

const testScript = (projectInfos: IProjectInfos): IQuestionResponse => ({
  type: 'input',
  message: '  Test Script (use empty value to skip)',
  name: 'testCommand',
  default: projectInfos.testCommand,
});

export default testScript;
