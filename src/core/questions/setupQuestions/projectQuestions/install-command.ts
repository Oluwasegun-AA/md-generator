import { IQuestionResponse } from "../../../../../types/typeDeclarations.interface";

const installScript = (): IQuestionResponse => ({
  type: 'input',
  message: '  Install Script (use empty value to skip)',
  name: 'installCommand',
  default: 'npm install',
});

export default installScript;
