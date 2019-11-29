import { getValues } from './actionsUtils';
import listHandler from './listActions';
import createHandler from './createActions';
import checkHandler from './checkActions';
import removeHandler from './removeActions';
import { ICurrentFile } from '../../types/typeDeclarations.interface';

/**
 * Handle all actions with respect to the supplied arguments
 */
class Actions {
  static list(args: any, resp: ICurrentFile): void {
    const values = getValues(args, resp);
    listHandler(values);
  }

  static create(args: any, resp: ICurrentFile): void {
    const values = getValues(args, resp);
    createHandler(values);
  }

  static check(args: any, resp: ICurrentFile): void {
    const values = getValues(args, resp);
    checkHandler(values);
  }

  static remove(args: any, resp: ICurrentFile): void {
    const values = getValues(args, resp);
    removeHandler(values);
  }
}

export default Actions;
