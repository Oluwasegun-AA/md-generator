import createHandler from '../index';
import { expect } from 'chai';

import {
  required,
  optional,
  none,
} from './mock/index.mock';

describe('test functions in core/actions/createActions', async() => {
  it('should call the createHandler function', async() => {
    const resp = await createHandler(none);
    const info = await createHandler(required);
    const data = await createHandler(optional);
    // const infos = await createHandler(file);
    // expect(infos).to.be.equal(undefined);
    expect(info).to.be.equal(undefined);
    expect(data).to.be.equal(undefined);
    expect(resp).to.be.equal(undefined);
  });
});
