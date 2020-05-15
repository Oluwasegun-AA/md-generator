export const packageJson = {
  author: {
    name: 'testAuthorName'
  }
};

export const packageJsonWithStringAuthor = {
  author: 'testAuthor'
};

export const packageJsonWithNullAuthor = {
  author: null
};

export const questionResponse1 = {
  type: 'input',
  name: 'string',
  message: 'string',
  default: undefined,
  filter: 'filter',
  choices: 'choices',
  when: () => true
};
export const questionResponse2 = {
  type: 'checkbox',
  name: 'string',
  message: 'string',
  default: undefined,
  filter: 'filter',
  choices: [{ checked: true, value: true }, { checked: false }],
  when: () => true
};
export const questionResponse3 = {
  type: 'type',
  name: 'string',
  message: 'string',
  default: 'true',
  filter: 'filter',
  choices: 'choices',
  when: () => true
};
export const questionResponse4 = {
  type: 'type',
  name: 'string',
  message: 'string',
  default: 'true',
  filter: 'filter',
  choices: 'choices',
  when: () => false
};
