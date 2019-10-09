import isEmpty from 'lodash/isEmpty';

const licenseUrl = projectInfos => ({
  type: 'input',
  message: '  License URL (use empty value to skip)',
  name: 'licenseUrl',
  default: projectInfos.licenseUrl,
  when: answersContext => !isEmpty(answersContext.licenseName),
});

export default licenseUrl;
