// @flow

import { MAKE_PRISTINE } from '../actionTypes';
import type { TAction } from '../types/TAction';

export type TMakePristineActionPayload = {
  formName: string;
  fieldKey: string;
};

export const makePristine = (
  formName: string,
  fieldKey: string,
): TAction<TMakePristineActionPayload> => ({
  type: MAKE_PRISTINE,
  payload: {
    formName,
    fieldKey,
  },
});
