import { expect } from 'chai';
import {
  find,
  getAppropriateQuestion,
  askQuestions,
  getInfos
} from '../askQuestions';
import { projectInfos } from '../../../templates/fileWriter/tests/mock/index.mock';
export default describe('test questions/askQuestions.ts', async () => {
  it('should return valid option', () => {
    const data: any = find(['find', 'this'], 'this');
    expect(data).to.be.equal('this');
  });
  it('should return null when files are invalid', () => {
    const data: any = getAppropriateQuestion(['find', 'this']);
    expect(data).to.be.equal(null);
  });
  it('should return appropriate questions for valid files', () => {
    const data: any = getAppropriateQuestion(['README', 'LICENSE', 'CODE_OF_CONDUCT']);
    expect(data.chooseTemplate).exist;
  });
  it('should ask for author\'s email', async () => {
    const data: any = await askQuestions(projectInfos, true, ['find', 'this']);
    expect(data.isGithubRepos).to.be.equal(true);
  });
  it('should ask for author\'s email', async () => {
    const data: any = await getInfos(true, ['find', 'this']);
    expect(data.repositoryUrl).to.be.equal('https://github.com/Oluwasegun-AA/md-generator');
    expect(data.isProjectOnNpm).to.be.equal(true);
  });
});
