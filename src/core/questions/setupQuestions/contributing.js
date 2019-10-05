const contributingUrl = packageJson => ({
  type: 'input',
  message: '🔧  Issues page URL (use empty value to skip)',
  name: 'contributingUrl',
  default: packageJson.contributingUrl,
});

export default contributingUrl;
