const testScript = projectInfos => ({
  type: 'input',
  message: '  Test Script (use empty value to skip)',
  name: 'testCommand',
  default: projectInfos.testCommand,
});

export default testScript;
