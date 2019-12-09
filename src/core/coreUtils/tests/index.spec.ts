import { expect } from 'chai';

import { ExtractOptions } from '../index';
import { args } from './mock/index.mock';

export default describe('Tests for coreUtils', () => {
  it('should return the valid options for list', () => {
    const data: any = ExtractOptions.list(args);
    expect(data.optional).to.be.equal(false);
  });
  it('should return the valid options for create', () => {
    const data: any = ExtractOptions.create(args);
    expect(data.optional).to.be.equal(false);
  });
  it('should return the valid options for check', () => {
    const data: any = ExtractOptions.check(args);
    expect(data.optional).to.be.equal(false);
  });
  it('should return the valid options for remove', () => {
    const data: any = ExtractOptions.remove(args);
    expect(data.optional).to.be.equal(false);
  });
});
