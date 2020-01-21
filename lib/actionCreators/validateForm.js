// @flow

import { VALIDATE_FORM } from '../actionTypes';
import type { TAction } from '../types/TAction';

export type TValidateFormActionPayload = {
    formName: string;
    errorsArray: string[] | null;
};

export const validateForm = (
    formName: string,
    errors: string[] | null,
): TAction<TValidateFormActionPayload> => ({
    type: VALIDATE_FORM,
    payload: {
        formName,
        errors,
    },
});
