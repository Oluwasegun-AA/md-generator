import { getValues } from './actionsUtils';
import listHandler from './listActions';
import createHandler from './createActions';
import checkHandler from './checkActions';
import removeHandler from './removeActions';

/**
 * @class
 * Handle all actions with respect to the supplied arguments
 */
class Actions {
  static list(args, resp) {
    const values = getValues(args, resp);
    listHandler(values);
  }

  static create(args, resp) {
    const values = getValues(args, resp);
    createHandler(values);
  }

  static async check(args, resp) {
    const values = getValues(args, resp);
    checkHandler(values);
  }

  static remove(args, resp) {
    const values = getValues(args, resp);
    removeHandler(values);
  }
}

export default Actions;
