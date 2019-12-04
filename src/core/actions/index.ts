import { getValues } from './actionsUtils';
import listHandler from './listActions';
import createHandler from './createActions';
import checkHandler from './checkActions';
import removeHandler from './removeActions';
import { ICurrentFile } from '../../../types/typeDeclarations.interface';

/**
 * Handle all actions with respect to the supplied arguments
 */
class Actions {
  public static list: any = (args: any, resp: ICurrentFile): void => {
    const values = getValues(args, resp);
    listHandler(values);
  }

  public static create: any = (args: any, resp: ICurrentFile): void => {
    const values = getValues(args, resp);
    createHandler(values);
  }

  public static check: any = (args: any, resp: ICurrentFile): void => {
    const values = getValues(args, resp);
    checkHandler(values);
  }

  public static remove: any = (args: any, resp: ICurrentFile): void => {
    const values = getValues(args, resp);
    removeHandler(values);
  }
}

export default Actions;
