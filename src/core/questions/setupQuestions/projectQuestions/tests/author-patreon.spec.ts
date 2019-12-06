import { expect } from 'chai';

import patreonUsername from '../author-patreon';

export default describe('test create questions', () => {
  it('should ask for author\'s Patreon username', () => {
    const data: any = patreonUsername();
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('authorPatreonUsername');
    expect(data.message.trim()).to.be.equal('Patreon username (use empty value to skip)');
  });
});
