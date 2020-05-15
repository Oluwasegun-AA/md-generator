import { expect } from 'chai';

import { askProjectPrerequisites, hasProjectInfosEngines } from '../project-prerequisites';
import { projectInfo } from './mock/index.mock';

export default describe('test create questions', () => {
  it('should ask for project\'s prerequisites', () => {
    const data: any = askProjectPrerequisites(projectInfo);
    expect(data.type).to.be.equal('checkbox');
    expect(data.name).to.be.equal('projectPrerequisites');
    expect(data.message.trim()).to.be.equal('Project prerequisites');
  });
  it('should return true if projectInfos.engines is valid', () => {
    const data: any = hasProjectInfosEngines(projectInfo);
    expect(data).to.be.equal(true);
  });
});
