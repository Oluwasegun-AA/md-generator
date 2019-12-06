import { expect } from 'chai';

import twitterUsername from '../author-twitter';

export default describe('test create questions', () => {
  it('should ask for author\'s twitter usernmae', () => {
    const data: any = twitterUsername();
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('authorTwitterUsername');
    expect(data.message.trim()).to.be.equal('Twitter username (use empty value to skip)');
  });
});
