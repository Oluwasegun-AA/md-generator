import { expect } from 'chai';
import {
  getProjectName,
  getPackageJson,
  getDefaultAnswer,
  getDefaultAnswers,
  getGitRepositoryName,
  isProjectAvailableOnNpm,
  cleanSocialNetworkUsername
} from '../utils';
import {
  questionResponse1,
  questionResponse2,
  questionResponse3,
  questionResponse4
} from './mock/index.mock';
export default describe('test functions in projectEnv/utils', async () => {
  it('should return repository name', async () => {
    const response = getGitRepositoryName(process.cwd());
    expect(response).to.be.equal('md-generator');
  });
  it('should return undefined if repo name cannot be retrieved', async () => {
    const response = getGitRepositoryName({});
    expect(response).to.be.equal(undefined);
  });
  it('should return project name', async () => {
    const response = getProjectName({});
    expect(response).to.be.equal('md-generator');
  });
  it('should return Package.json', async () => {
    const response = await getPackageJson();
    expect(response.name).to.be.equal('md-generator');
    expect(response.main).to.be.equal('index.js');
  });
  it('should return true if project is available on npm', async () => {
    const response = isProjectAvailableOnNpm('md-generator');
    expect(response).to.be.equal(true);
  });
  it('should return "" question type = input and default answer undefined', async () => {
    const response = getDefaultAnswer(questionResponse1, '');
    expect(response).to.be.equal('');
  });
  it('should return true when value of selected choice is true', async () => {
    const response = getDefaultAnswer(questionResponse2, '');
    expect(response[0]).to.be.equal(true);
  });
  it('should return undefined when question type is neither input or checkbox', async () => {
    const response = getDefaultAnswer(questionResponse3, '');
    expect(response).to.be.equal(undefined);
  });
  it('should return undefined with falsy when condition', async () => {
    const response = getDefaultAnswer(questionResponse4, '');
    expect(response).to.be.equal(undefined);
  });
  it('should get answers for multiple questions', async () => {
    const response = getDefaultAnswers(['']);
    expect(response).to.be.equal(undefined);
  });
  it('should clean social network username removing an "@" character', async () => {
    const response = cleanSocialNetworkUsername('@username');
    expect(response).to.be.equal('username');
  });
});
