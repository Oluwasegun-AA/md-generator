import { expect } from 'chai';

import IsValidArgs, { isValidOption } from '../IsInvalidArgs';
import { validArguments } from './mock/index.mock';

export default describe('Validation tests', () => {
  it('should return false for invalid arguments', () => {
    const response: boolean = isValidOption(validArguments.listAndCheck, [['empty']]);
    expect(response).to.be.equal(false);
  });
  it('should return false for invalid argument on the list option', () => {
    const response: boolean = IsValidArgs.list(['empty']);
    expect(response).to.be.equal(false);
  });
  it('should return false for invalid argument on the create option', () => {
    const response: boolean = IsValidArgs.create(['empty']);
    expect(response).to.be.equal(false);
  });
  it('should return false for invalid argument on the check option', () => {
    const response: boolean = IsValidArgs.check(['empty']);
    expect(response).to.be.equal(false);
  });
  it('should return false for invalid argument on the remove option', () => {
    const response: boolean = IsValidArgs.remove(['empty']);
    expect(response).to.be.equal(false);
  });
  it('should return true for valid arguments on the list option', () => {
    const response: boolean = IsValidArgs.list(['required']);
    expect(response).to.be.equal(true);
  });
  it('should return true for valid arguments on the create option', () => {
    const response: boolean = IsValidArgs.create(['required']);
    expect(response).to.be.equal(true);
  });
  it('should return true for valid arguments on the check option', () => {
    const response: boolean = IsValidArgs.check(['required']);
    expect(response).to.be.equal(true);
  });
  it('should return true for valid arguments on the remove option', () => {
    const response: boolean = IsValidArgs.remove(['required']);
    expect(response).to.be.equal(true);
  });
});
