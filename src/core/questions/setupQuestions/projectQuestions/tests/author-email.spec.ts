import { expect } from 'chai';
import {projectInfo} from './mock/index.mock';

import authorEmail from '../author-email';

export default describe('test create questions', () => {
  it('should ask for author\'s email', () => {
    const data: any = authorEmail(projectInfo);
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('authorEmail');
  })
});
