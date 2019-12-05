import { getFullFileNames } from '../index';
import filesArray from './mock/index.mock';
import { expect } from 'chai';

describe('Get file names', () => {
  it('should return file name', () => {
    const names = getFullFileNames(filesArray);
    expect(names[0]).to.equal('README.md');
    expect(names[1]).to.equal('CODE_OF_CONDUCT.md');
  });
});
