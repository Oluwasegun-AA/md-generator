import {
  log,
  useBox,
  spinner,
  useHelpAlert,
  showEndMessage,
  customHelp,
  noCommandAlert,
  wrongCommandAlert,
  castElementsToFormatedString,
  checkCommunityStandardMet,
  fileNotDetectedAlert,
  unrecognizedFileAlert
} from '../alerts';
import { expect } from 'chai';
import { elements } from './mock/alert.mock';

describe('test functions in common/alert', () => {
  it('should log arguments to the console', () => {
    const logData: any = log('print', 'hello', 'world');
    expect(logData).to.equal(undefined);
  });
  it('should call the useBox', () => {
    const logData: any = useBox('print');
    expect(logData).to.equal(undefined);
  });
  it('should call showEndMessage', () => {
    const logData: any = showEndMessage('print', 'hello', 'world');
    expect(logData).to.equal(undefined);
  });
  it('should call customHelp', () => {
    const logData: any = customHelp();
    expect(logData).to.equal(undefined);
  });
  it('should call wrongCommandAlert', () => {
    const logData: any = wrongCommandAlert();
    expect(logData).to.equal(undefined);
  });
  it('should call noCommandAlert', () => {
    const logData: any = noCommandAlert();
    expect(logData).to.equal(undefined);
  });
  it('should trigger spinner', () => {
    const logData: any = spinner('hello');
    expect(logData.options.text).to.equal('hello');
  });
  it('should cast Elements ToFormated String', () => {
    const logData: any = castElementsToFormatedString(elements);
    expect(logData[5]).to.equal('-');
  });
  it('should trigger fileNotDetectedAlert', () => {
    const logData: any = fileNotDetectedAlert();
    expect(logData).to.equal(undefined);
  });

  it('should trigger unrecognizedFileAlert', () => {
    const logData: any = unrecognizedFileAlert(elements);
    expect(logData).to.equal(undefined);
  });
  it('should trigger useHelpAlert', () => {
    const logData: any = useHelpAlert();
    expect(logData).to.equal(undefined);
  });
  it('should log link to github', () => {
    const messageWithParameters: any = checkCommunityStandardMet('username', 'project');
    expect(messageWithParameters).to.equal(undefined);
    const messageWithoutParameters: any = checkCommunityStandardMet();
    expect(messageWithoutParameters).to.equal(undefined);
  });
});
