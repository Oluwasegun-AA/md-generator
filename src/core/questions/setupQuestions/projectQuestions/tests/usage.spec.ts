import { expect } from 'chai';

import usageInfo from '../usage';
import { projectInfo } from './mock/index.mock';

export default describe('test create questions', () => {
  it('should ask for the usage description', () => {
    const data: any = usageInfo(projectInfo);
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('usage');
    expect(data.message.trim()).to.be.equal('Usage command or instruction (use empty value to skip)');
  });
});
