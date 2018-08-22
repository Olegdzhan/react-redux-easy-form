import * as actionTypes from './actionTypes';

export const setValue = (formName, fieldKey, value) => ({
  type: actionTypes.SET_VALUE,
  payload: {
    formName,
    fieldKey,
    value
  }
});

export const setInitialValues = (formName, initialValues) => ({
  type: actionTypes.SET_INITIAL_VALUES,
  payload: {
    formName,
    initialValues
  }
});

export const validateField = (formName, fieldKey, errorMessage) => ({
  type: actionTypes.VALIDATE_FIELD,
  payload: {
    formName,
    fieldKey,
    errorMessage
  }
});

export const validateForm = (formName, errorsArray) => ({
  type: actionTypes.VALIDATE_FORM,
  payload: {
    formName,
    errorsArray
  }
});

export const dropForm = (formName, saveInitial) => ({
  type: actionTypes.DROP_FORM,
  payload: {
    formName,
    saveInitial
  }
});

export const makeDirty = (formName, fieldKey) => ({
  type: actionTypes.MAKE_DIRTY,
  payload: {
    formName,
    fieldKey
  }
});