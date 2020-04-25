// @flow
import { MAKE_PRISTINE } from '../actionTypes';

export type TMakePristineAction = {
  +type: typeof MAKE_PRISTINE;
  +payload: {
    +formName: string;
    +fieldKey: string;
  };
};

export const makePristine = (
  formName: string,
  fieldKey: string,
): TMakePristineAction => ({
  type: MAKE_PRISTINE,
  payload: {
    formName,
    fieldKey,
  },
});
