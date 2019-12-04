import { IProjectInfos, IQuestionResponse } from "../../../../../types/typeDeclarations.interface";

const projectHomepage = (projectInfos: IProjectInfos): IQuestionResponse => ({
  type: 'input',
  message: '  Project homepage (use empty value to skip)',
  name: 'projectHomepage',
  default: projectInfos.homepage,
});

export default projectHomepage;
