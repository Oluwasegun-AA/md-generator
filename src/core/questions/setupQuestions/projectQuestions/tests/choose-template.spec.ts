import { expect } from 'chai';

import chooseTemplate from '../choose-template';

export default describe('test create questions', () => {
  it('should ask to choose readme template', () => {
    const data: any = chooseTemplate();
    expect(data.type).to.be.equal('list');
    expect(data.name).to.be.equal('templatePath');
    expect(data.message.trim()).to.be.equal('Use HTML in your README.md for a nicer rendering? (not supported everywhere. ex: Bitbucket)');
  });
});
