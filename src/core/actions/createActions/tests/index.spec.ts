import { expect } from 'chai';
import createHandler, {
  getValidFiles,
} from '../index';

import {
  none,
  required,
  optional,
  currentFile,
} from './mock/index.mock';

export default describe('test functions in core/actions/createActions', async () => {
  it('should call the createHandler function', async () => {
    const resp = await createHandler(none);
    const info = await createHandler(required);
    const data = await createHandler(optional);
    expect(info).to.be.equal(undefined);
    expect(data).to.be.equal(undefined);
    expect(resp).to.be.equal(undefined);
  });

  it('should inquire if the supplied filename is valid/supported', () => {
    const data = getValidFiles([currentFile], ['file']);
    expect(data.validFileNames[0]).to.be.equal(undefined);
    expect(data.inValidFileNames[0]).to.be.equal('FILE');
  });
});
