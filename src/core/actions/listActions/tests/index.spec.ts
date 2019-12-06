import listHandler from '../index';
import { expect } from 'chai';

import {
  requiredAndAll,
  optionalAndAll
} from './mock/index.mock';

export default describe('test functions in core/actions/createActions', async() => {
  it('should call the listHandler function', async() => {
    const infos = await listHandler(requiredAndAll);
    const info = await listHandler(optionalAndAll);
    expect(infos).to.be.equal(undefined);
    expect(info).to.be.equal(undefined);
  });
});
