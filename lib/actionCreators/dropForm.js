// @flow

import { DROP_FORM } from '../actionTypes';
import type { TAction } from '../types/TAction';

export type TDropFormActionPayload = {
    formName: string;
    restoreInitials: boolean;
};

export const dropForm = (
    formName: string,
    restoreInitials: boolean = false,
): TAction<TDropFormActionPayload> => ({
    type: DROP_FORM,
    payload: {
        formName,
        restoreInitials,
    },
});
