import removeHandler, {
  deleteFromCodebase,
  deleteFiles,
  removeSpecificFiles
} from '../index';
import { expect } from 'chai';

import {
  file,
  none,
  optional,
  required,
  currentFile
} from './mock/index.mock';

export default describe('test functions in core/actions/createActions', () => {
  it('should call the createHandler function', () => {
    const resp = removeHandler(none);
    const info = removeHandler(required);
    const data = removeHandler(optional);
    expect(info).to.be.equal(undefined);
    expect(data).to.be.equal(undefined);
    expect(resp).to.be.equal(undefined);
  });
  it('should log no files selected', () => {
    const data = deleteFromCodebase(['file'], { file: {path:''} });
    expect(data).to.be.equal(undefined);
  });
  it('should delete form codebase', () => {
    const data = deleteFiles(['file'], file);
    expect(data).to.be.equal(undefined);
  });
  it('should prompt to delete files', () => {
    const data = deleteFiles([], file);
    expect(data).to.be.equal(undefined);
  });
  it('should remove a specific file', () => {
    const data = removeSpecificFiles([currentFile]);
    expect(data).to.be.equal(undefined);
  });
});
