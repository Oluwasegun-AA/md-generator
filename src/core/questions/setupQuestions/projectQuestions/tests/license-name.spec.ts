import { expect } from 'chai';

import licenseName from '../license-name';

export default describe('test create questions', () => {
  it('should ask for the lisence name', () => {
    const data: any = licenseName();
    expect(data.type).to.be.equal('list');
    expect(data.name).to.be.equal('licenseName');
    expect(data.message.trim()).to.be.equal('License name');
  });
});
