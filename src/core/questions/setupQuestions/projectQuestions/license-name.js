const licenseName = packageJson => ({
  type: 'input',
  message: '  License name (use empty value to skip)',
  name: 'licenseName',
  default: packageJson.licenseName,
});

export default licenseName;
