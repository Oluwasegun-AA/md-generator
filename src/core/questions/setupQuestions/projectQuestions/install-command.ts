const installScript = () => ({
  type: 'input',
  message: '  Install Script (use empty value to skip)',
  name: 'installCommand',
  default: 'npm install',
});

export default installScript;
