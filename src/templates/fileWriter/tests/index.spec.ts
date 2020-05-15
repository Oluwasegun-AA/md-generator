import chai, { expect } from 'chai';
import { writeFile, buildFileContent } from '../index';
import { projectInfos } from './mock/index.mock';
import spies from 'chai-spies';

chai.use(spies);

export default describe('test functions in templates/fileWriter/index.ts', async () => {
  it('should call writeFile', async () => {
    const response = writeFile('hello world', '/demo/path');
    expect(response).to.be.equal(undefined);
  });
  it('should call buildFileContent', async () => {
    const response = buildFileContent(projectInfos, '/demo/path');
    expect(JSON.stringify(response)).to.be.equal('{}');
  });
});
