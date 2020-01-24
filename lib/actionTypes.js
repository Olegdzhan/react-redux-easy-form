// @flow

export const prefix = '[easy-form]::';

export function createActionType(tail: string): string {
  return `${prefix}${tail}`;
}

export const SET_VALUE = createActionType('SET_VALUE');
export const SET_INITIAL_VALUES = createActionType('SET_INITIAL_VALUES');
export const VALIDATE_FIELD = createActionType('VALIDATE_FIELD');
export const VALIDATE_FORM = createActionType('VALIDATE_FORM');
export const DROP_FORM = createActionType('DROP_FORM');
export const MAKE_DIRTY = createActionType('MAKE_DIRTY');
export const MAKE_PRISTINE = createActionType('MAKE_PRISTINE');
export const CLEAR_FIELD_ERROR = createActionType('CLEAR_FIELD_ERROR');
export const CLEAR_FORM_ERRORS = createActionType('CLEAR_FORM_ERRORS');
