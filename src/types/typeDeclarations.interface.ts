export interface IBOX_CONFIG {
  padding: number;
  margin: { top: number; bottom: number };
  borderColor: string;
  align: string;
  borderStyle: string;
};

export interface ICurrentFile {
  name: string;
  exists: boolean;
  path: string;
  templatePath?: string;
};

export interface IProjectInfos {
  name: string | any;
  description: string | any;
  version: string | any;
  author: string | any;
  homepage: string | any;
  repositoryUrl: string | any;
  contributingUrl: string | any;
  githubUsername: string | any;
  engines: string | any;
  licenseName: {
    name: string | any;
  };
  licenseUrl: string | any;
  documentationUrl: string | any;
  isGithubRepo: boolean | any;
  usage: string | any;
  testCommand: string | any;
  isGithubRepos?: boolean | any;
  projectName?: string | any;
  projectPrerequisites?: any | any;
  isProjectOnNpm?: any | any;
};

export interface IRequiredFiles {
  README?: {
    name: string;
    exists: boolean;
    path: string;
  };
  LICENSE?: {
    name: string;
    exists: boolean;
    path: string;
  };
  CODE_OF_CONDUCT?: {
    name: string;
    exists: boolean;
    path: string;
    templatePath: string;
  };
  PULL_REQUEST_TEMPLATE?: {
    name: string;
    exists: boolean;
    path: string;
    templatePath: string
  };
  BUG_REPORT?: {
    name: string;
    exists: boolean;
    path: string;
    templatePath: string;
  };
  FEATURE_REQUEST?: {
    name: string;
    exists: boolean;
    path: string;
    templatePath: string
  };
};

// optional files Objects and their details
export interface IOptionalFiles {
  CHANGELOG?: {
    name: string;
    exists: boolean;
    path: string;
    templatePath: string;
  };
  SUPPORT?: {
    name: string;
    exists: boolean;
    path: string;
    templatePath: string;
  };
  CONTRIBUTORS?: {
    name: string;
    exists: boolean;
    path: string;
    templatePath: string;
  };
  AUTHORS?: {
    name: string;
    exists: boolean;
    path: string;
    templatePath: string;
  };
  ACKNOWLEDGMENTS?: {
    name: string;
    exists: boolean;
    path: string;
    templatePath: string;
  };
  CODEOWNERS?: {
    name: string;
    exists: boolean;
    path: string;
    templatePath: string;
  };
};

export interface IAllFiles extends IRequiredFiles, IOptionalFiles{
};

export interface ISortedFiles {
  validFileNames: string[];
  inValidFileNames: string[];
  foundFiles: string[];
  filesNotFound: string[];
};

export interface IArguments {
  optional?: boolean;
  required?: boolean;
  all?: string[];
  file?: string[];
  empty?: boolean;
  resp?: ICurrentFile[];
  isEmpty?: boolean;
}

export interface IQuestionResponse {
  type?: string;
  name?: string;
  message?: string;
  default?: boolean | string;
  filter?: any;
  choices?: boolean| string[] | any;
  when?: any;
};

export interface IQuestions {
  chooseTemplate?: IQuestionResponse | any;
  askProjectName?: IQuestionResponse | any;
  askProjectVersion?: IQuestionResponse | any;
  askProjectHomepage?: IQuestionResponse | any;
  askProjectDescription?: IQuestionResponse | any;
  askLicenseName?: IQuestionResponse | any;
  askLicenseUrl?: IQuestionResponse | any;
  askInstallCommand?: IQuestionResponse | any;
  askTestCommand?: IQuestionResponse | any;
  askProjectDocumentationUrl?: IQuestionResponse | any;
  askAuthorName?: IQuestionResponse | any;
  askAuthorGithub?: IQuestionResponse | any;
  askAuthorTwitter?: IQuestionResponse | any;
  askAuthorPatreon?: IQuestionResponse | any;
  askProjectPrerequisites?: IQuestionResponse | any;
  askContributing?: IQuestionResponse | any;
  askUsage?: IQuestionResponse | any;
  askAuthorEmail?: IQuestionResponse | any;
}