import { expect } from 'chai';
import files from './mock/createInit.mock';

import {
  createFiles,
  overrideFiles,
  createEmptyFiles
} from '../createInit';

export default describe('test create questions', () => {
  it('should ask the create question', () => {
    const data: any = createFiles(files);
    expect(data.type).to.be.equal('confirm');
    expect(data.name).to.be.equal('createFiles');
  })
  it('should ask override question', () => {
    const data: any = overrideFiles(['readme']);
    expect(data.type).to.be.equal('confirm');
    expect(data.name).to.be.equal('override');
  })
  it('should ask to create empty files', () => {
    const data: any = createEmptyFiles();
    expect(data.type).to.be.equal('confirm');
    expect(data.name).to.be.equal('empty');
  })
})