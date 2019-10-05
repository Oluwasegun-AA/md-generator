const documentationUrl = projectInfos => ({
  type: 'input',
  message: '📘  Project documentation URL (use empty value to skip)',
  name: 'projectDocumentationUrl',
  default: projectInfos.documentationUrl,
});

export default documentationUrl;
