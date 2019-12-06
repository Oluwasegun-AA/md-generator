import { expect } from 'chai';

import projectDescription from '../project-description';
import {projectInfo} from './mock/index.mock';

export default describe('test create questions', () => {
  it('should ask for the project\'s description', () => {
    const data: any = projectDescription(projectInfo);
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('projectDescription');
    expect(data.message.trim()).to.be.equal('Project description');
  });
});
