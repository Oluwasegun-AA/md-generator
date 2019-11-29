const projectHomepage = projectInfos => ({
  type: 'input',
  message: '  Project homepage (use empty value to skip)',
  name: 'projectHomepage',
  default: projectInfos.homepage,
});

export default projectHomepage;
