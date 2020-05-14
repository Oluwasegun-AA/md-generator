import { expect } from 'chai';

import licenseUrl from '../license-url';
import { projectInfo } from './mock/index.mock';

export default describe('test create questions', () => {
  it('should ask for the license URL', () => {
    const data: any = licenseUrl(projectInfo);
    expect(data.type).to.be.equal('input');
    expect(data.name).to.be.equal('licenseUrl');
    expect(data.message.trim()).to.be.equal('License URL (use empty value to skip)');
  });
});

