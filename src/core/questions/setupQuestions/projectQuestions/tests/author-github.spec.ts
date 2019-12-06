import { expect } from 'chai';
import {projectInfo} from './mock/index.mock';

import authorGithubUsername from '../author-github';

export default describe('test create questions', () => {
  it('should ask for github username', () => {
    const data: any = authorGithubUsername(projectInfo);
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('authorGithubUsername');
    expect(data.message.trim()).to.be.equal('GitHub username (use empty value to skip)');
  });
});
