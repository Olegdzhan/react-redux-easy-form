// @flow
import { MAKE_DIRTY } from '../actionTypes';

export type TMakeDirtyAction = {
  +type: typeof MAKE_DIRTY;
  +payload: {
    +formName: string;
    +fieldKey: string;
  };
};

export const makeDirty = (
  formName: string,
  fieldKey: string,
): TMakeDirtyAction => ({
  type: MAKE_DIRTY,
  payload: {
    formName,
    fieldKey,
  },
});
