import { IQuestionResponse } from "../../../../types/typeDeclarations.interface";

const patreonUsername = (): IQuestionResponse  => ({
  type: 'input',
  message: '  Patreon username (use empty value to skip)',
  name: 'authorPatreonUsername',
});

export default patreonUsername;
