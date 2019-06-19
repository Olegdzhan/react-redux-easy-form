import * as actionTypes from './actionTypes';

export default FormsList => {

  const defaultState = {};
  for (const key in FormsList) {
    defaultState[FormsList[key]] = {
      statuses: {},
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
        const statuses = {};
        Object.keys(initialValues).forEach(fieldKey => statuses[fieldKey] = 'pristine');
        return {
          ...state,
          [formName]: {
            ...state[formName],
            initialValues,
            statuses
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

      case actionTypes.CLEAR_FIELD_ERROR: {
        const { formName, fieldKey } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            fieldErrors: {
              ...state[formName].fieldErrors,
              [fieldKey]: null
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

      case actionTypes.CLEAR_FORM_ERRORS: {
        const { formName } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            formErrors: []
          }
        };
      }

      case actionTypes.DROP_FORM: {
        const { formName, saveInitial } = action.payload;
        const initialValues = saveInitial ? state[formName].initialValues : defaultState[formName].initialValues;
        const statuses = {};
        Object.keys(state[formName].statuses).forEach(fieldKey => statuses[fieldKey] = 'pristine');
        return {
          ...state,
          [formName]: {
            ...defaultState[formName],
            initialValues,
            statuses
          }
        };
      }

      case actionTypes.MAKE_DIRTY: {
        const { formName, fieldKey } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            statuses: {
              ...state[formName].statuses,
              [fieldKey]: 'dirty'
            }
          }
        };
      }

      case actionTypes.MAKE_PRISTINE: {
        const { formName, fieldKey } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            statuses: {
              ...state[formName].statuses,
              [fieldKey]: 'pristine'
            }
          }
        };
      }

      default:
        return state;

    }
  };
}