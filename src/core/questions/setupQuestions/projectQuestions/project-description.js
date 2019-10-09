const projectDescription = projectInfos => ({
  type: 'input',
  message: '  Project description',
  name: 'projectDescription',
  default: projectInfos.description,
});

export default projectDescription;
