// @flow

import { CLEAR_FORM_ERRORS } from '../actionTypes';
import type { TAction } from '../types/TAction';

export type TClearFormErrorsActionPayload = {
    formName: string;
};

export const clearFormErrors = (formName: string): TAction<TClearFormErrorsActionPayload> => ({
    type: CLEAR_FORM_ERRORS,
    payload: {
        formName,
    },
});
