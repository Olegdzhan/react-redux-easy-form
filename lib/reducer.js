import * as actionTypes from './actionTypes';

export default FormsList => {

  const defaultState = {};
  for (const key in FormsList) {
    defaultState[FormsList[key]] = {
      initialValues: {},
      currentValues: {},
      fieldErrors: {},
      formErrors: []
    };
  }

  return (state = defaultState, action) => {
    switch (action.type) {

      case actionTypes.SET_VALUE: {
        const { formName, fieldKey, value } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            currentValues: {
              ...state[formName].currentValues,
              [fieldKey]: value
            }
          }
        };
      }

      case actionTypes.SET_INITIAL_VALUES: {
        const { formName, initialValues } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            initialValues
          }
        };
      }

      case actionTypes.VALIDATE_FIELD: {
        const { formName, fieldKey, errorMessage } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            fieldErrors: {
              ...state[formName].fieldErrors,
              [fieldKey]: errorMessage
            }
          }
        };
      }

      case actionTypes.VALIDATE_FORM: {
        const { formName, errorsArray } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            formErrors: errorsArray
          }
        };
      }

      case actionTypes.DROP_FORM: {
        const { formName, saveInitial } = action.payload;
        const initialValues = saveInitial ? state[formName].initialValues : defaultState[formName].initialValues;
        return {
          ...state,
          [formName]: {
            ...defaultState[formName],
            initialValues
          }
        };
      }

      default:
        return state;

    }
  };
}