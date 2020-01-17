// @flow

import { SET_INITIAL_VALUES } from '../actionTypes';
import type { TAction } from '../types/TAction';

export type TSetInitialValuesActionPayload = {
    formName: string;
    initialValues: { [k: string]: any };
};

export const setInitialValues = (
    formName: string,
    initialValues: { [k: string]: any },
): TAction<TSetInitialValuesActionPayload> => ({
    type: SET_INITIAL_VALUES,
    payload: {
        formName,
        initialValues
    }
});
