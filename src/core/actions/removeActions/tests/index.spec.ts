import removeHandler from '../index';
import { expect } from 'chai';

import {
  required,
  optional,
  none,
} from './mock/index.mock';

export default describe('test functions in core/actions/createActions', () => {
  it('should call the createHandler function', () => {
    const resp = removeHandler(none);
    const info = removeHandler(required);
    const data = removeHandler(optional);
    // const infos = removeHandler(file);
    // expect(infos).to.be.equal(undefined);
    expect(info).to.be.equal(undefined);
    expect(data).to.be.equal(undefined);
    expect(resp).to.be.equal(undefined);
  });
});
