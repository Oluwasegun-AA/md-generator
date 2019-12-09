import { expect } from 'chai';

import handleCommand, { filterValidArgs } from '../ValidateOptions';

export default describe('Test ValidateOptions.ts', () => {
  it('Should filter args', () => {
    const response: any = filterValidArgs({});
    expect(response.args).to.be.equal(undefined);
  });
  it('Should handle commands', () => {
    const response: any = handleCommand({
      _name: 'list', optional: true,
      required: false,
      all: false,
      file: false,
      empty: false
    });
    expect(response.args).to.be.equal(undefined);
  });
});
