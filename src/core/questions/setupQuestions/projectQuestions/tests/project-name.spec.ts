import { expect } from 'chai';

import projectName from '../project-name';
import { projectInfo } from './mock/index.mock';

export default describe('test create questions', () => {
  it('should ask for project\'s name', () => {
    const data: any = projectName(projectInfo);
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('projectName');
    expect(data.message.trim()).to.be.equal('Project name');
  });
});
