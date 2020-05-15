import { expect } from 'chai';
import { getAuthorName, getRepoIssuesUrl, getRepoUrlFromGit } from '../projectInfo';
import { packageJson, packageJsonWithStringAuthor, packageJsonWithNullAuthor } from './mock/index.mock'

export default describe('test functions in projectEnv/projectInfo', async () => {
  it('should return undefined fi author name is null', async () => {
    const response = getAuthorName(packageJsonWithNullAuthor);
    expect(response).to.be.equal(undefined);
  });

  it('should call getRepoIssuesUrl function', async () => {
    const response = getRepoIssuesUrl(packageJson);
    expect(response).to.be.equal(undefined);
  });

  it('should return author name from package.json file', async () => {
    const response = getAuthorName(packageJsonWithStringAuthor);
    expect(response).to.be.equal('testAuthor');
  });

  it('should call getRepoUrlFromGit function', async () => {
    const response = getRepoUrlFromGit();
    expect(response).to.be.equal(undefined);
  });

  it('should return author name from package.json file', async () => {
    const response = getAuthorName(packageJson);
    expect(response).to.be.equal('testAuthorName');
  });
});
