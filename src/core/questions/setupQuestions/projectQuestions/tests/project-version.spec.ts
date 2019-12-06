import { expect } from 'chai';

import projectVersion from '../project-version';
import { projectInfo } from './mock/index.mock';

export default describe('test create questions', () => {
  it('should ask for project\'s version', () => {
    const data: any = projectVersion(projectInfo);
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('projectVersion');
    expect(data.message.trim()).to.be.equal('Project version (use empty value to skip)');
  });
});
