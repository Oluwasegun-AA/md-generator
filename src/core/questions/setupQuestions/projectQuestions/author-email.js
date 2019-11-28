const authorEmail = projectInfos => ({
  type: 'input',
  message: '  Author\'s email  or  Team\'s mail address',
  name: 'authorEmail',
  default: projectInfos.author,
});

export default authorEmail;
