import { expect } from 'chai';

import contributingUrl from '../contributing';

export default describe('test create questions', () => {
  it('should ask for the contributing URL', () => {
    const data: any = contributingUrl({});
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('contributingUrl');
    expect(data.message.trim()).to.be.equal('Issues page URL (use empty value to skip)');
  });
});
