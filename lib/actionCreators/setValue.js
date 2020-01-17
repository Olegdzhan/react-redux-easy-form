// @flow

import { SET_VALUE } from '../actionTypes';
import type { TAction } from '../types/TAction';

export type TSetValueActionPayload = {
    formName: string;
    fieldKey: string;
    value: any;
};

export const setValue = (
    formName: string,
    fieldKey: string,
    value: any
): TAction<TSetValueActionPayload> => ({
    type: SET_VALUE,
    payload: {
        formName,
        fieldKey,
        value
    }
});