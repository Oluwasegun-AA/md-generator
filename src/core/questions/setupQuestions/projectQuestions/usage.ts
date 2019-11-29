const usageInfo = projectInfos => ({
  type: 'input',
  message: '  Usage command or instruction (use empty value to skip)',
  name: 'usage',
  default: projectInfos.usage,
});

export default usageInfo;
