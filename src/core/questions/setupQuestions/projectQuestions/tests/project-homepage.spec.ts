import { expect } from 'chai';

import projectHomepage from '../project-homepage';
import { projectInfo } from './mock/index.mock';

export default describe('test create questions', () => {
  it('should ask for project\'s homepage', () => {
    const data: any = projectHomepage(projectInfo);
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('projectHomepage');
    expect(data.message.trim()).to.be.equal('Project homepage (use empty value to skip)');
  });
});
