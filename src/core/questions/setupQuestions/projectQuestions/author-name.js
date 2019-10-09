const authorName = projectInfos => ({
  type: 'input',
  message: '  Author\'s name',
  name: 'authorName',
  default: projectInfos.author,
});

export default authorName;
