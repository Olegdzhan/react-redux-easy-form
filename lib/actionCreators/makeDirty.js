// @flow

import { MAKE_DIRTY } from '../actionTypes';
import type { TAction } from '../types/TAction';

export type TMakeDirtyActionPayload = {
  formName: string;
  fieldKey: string;
};

export const makeDirty = (
  formName: string,
  fieldKey: string,
): TAction<TMakeDirtyActionPayload> => ({
  type: MAKE_DIRTY,
  payload: {
    formName,
    fieldKey,
  },
});
