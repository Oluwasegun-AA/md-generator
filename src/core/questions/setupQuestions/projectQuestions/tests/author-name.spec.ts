import { expect } from 'chai';
import { projectInfo } from './mock/index.mock';

import authorName from '../author-name';

export default describe('test create questions', () => {
  it('should ask for the author\'s name', () => {
    const data: any = authorName(projectInfo);
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('authorName');
    expect(data.message.trim()).to.be.equal('Author\'s name');
  });
});
