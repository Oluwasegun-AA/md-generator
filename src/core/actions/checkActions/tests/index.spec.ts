import checkHandler from '../index';
import { expect } from 'chai';

import {
  required,
  optional
} from './mock/index.mock';

describe('test functions in core/actions/createActions', async() => {
  it('should call the checkHandler function', async() => {
    const infos = await checkHandler(required);
    const info = await checkHandler(optional);
    expect(infos).to.be.equal(undefined);
    expect(info).to.be.equal(undefined);
  });
});
