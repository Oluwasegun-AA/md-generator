import { expect } from 'chai';

import testScript from '../test-command';
import { projectInfo } from './mock/index.mock';

export default describe('test create questions', () => {
  it('should ask for the test command', () => {
    const data: any = testScript(projectInfo);
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('testCommand');
    expect(data.message.trim()).to.be.equal('Test Script (use empty value to skip)');
  });
});
