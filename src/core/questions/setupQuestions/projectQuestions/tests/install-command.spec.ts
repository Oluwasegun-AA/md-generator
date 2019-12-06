import { expect } from 'chai';

import installScript from '../install-command';

export default describe('test create questions', () => {
  it('should ask for the install command', () => {
    const data: any = installScript();
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('installCommand');
    expect(data.message.trim()).to.be.equal('Install Script (use empty value to skip)');
  });
});
