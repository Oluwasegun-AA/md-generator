import { expect } from 'chai';

import prerequisites from '../project-prerequisites';
import { projectInfo } from './mock/index.mock';

export default describe('test create questions', () => {
  it('should ask for project\'s prerequisites', () => {
    const data: any = prerequisites(projectInfo);
    expect(data.type).to.be.equal('checkbox');
    expect(data.name).to.be.equal('projectPrerequisites');
    expect(data.message.trim()).to.be.equal('Project prerequisites');
  });
});
