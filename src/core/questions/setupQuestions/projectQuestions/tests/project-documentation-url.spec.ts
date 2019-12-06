import { expect } from 'chai';

import documentationUrl from '../project-documentation-url';
import { projectInfo } from './mock/index.mock';

export default describe('test create questions', () => {
  it('should ask for the documentation URL', () => {
    const data: any = documentationUrl(projectInfo);
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('projectDocumentationUrl');
    expect(data.message.trim()).to.be.equal('Project documentation URL (use empty value to skip)');
  });
});
