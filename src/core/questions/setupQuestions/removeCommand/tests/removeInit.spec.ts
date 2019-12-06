import { expect } from 'chai';

import {validateRemove, removeOptional} from '../removeInit';

export default describe('test create questions', () => {
  it('should verify file removal', () => {
    const data: any = validateRemove([]);
    expect(data.type).to.be.equal('confirm');
    expect(data.name).to.be.equal('removeFiles');
    expect(data.default).to.be.equal('false');
  });
  it('should verify file removal', () => {
    const data: any = removeOptional([]);
    expect(data.type).to.be.equal('checkbox');
    expect(data.name).to.be.equal('removeFiles');
    expect(data.message.trim()).to.be.equal('Which of the following OPTIONAL .md files(s) would you like to delete?');
  });
});
