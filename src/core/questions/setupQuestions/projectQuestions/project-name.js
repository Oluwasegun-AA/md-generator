const projectName = projectInfos => ({
  type: 'input',
  message: '  Project name',
  name: 'projectName',
  default: projectInfos.name,
});

export default projectName;
