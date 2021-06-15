# v1.x
## v1.0.3
- fix `validateAll` action-creator in when calls fields validators
- fix `createGetFormSafetyValues` selector-creator for pristine values
## v1.0.2
- Form component props interface updated with full list of `FormHTMLAttributes<HTMLFormElement>` props
## v1.0.0
### Full update of the library: 
- previous versions are totally deprecated
- extremely fast performance
- react-hooks approach
- amount of subscriptions within components were reduced to minimum
- easier to configure
- fully written with TypeScript
#### Reducer
- easyFormReducer
#### Redux-Middleware
- easyFormMiddleware
#### Enums
- EEasyFormFieldStatus,
- EEasyFormField,
#### Components
- Form
#### Hooks
- useField
#### Action-Creators starting the middleware
- changeValue,
- changeValueAndValidate,
- clearValue,
- validateAll,
- validateField,
#### Action-Creators (flat)
- clearFieldErrors,
- clearFieldValue,
- dropForm,
- initiateForm,
- setFieldErrors,
- setFieldStatus,
- setFieldValue,
- setFormErrors,
#### Selectors and Selector-Creators
- getForms,
- createGetForm,
- createGetCommonFormErrors,
- createGetFormAllFieldsErrors,
- createGetFormErrors,
- createGetIsFormValid,
- createGetFormFieldErrors,
- createGetIsFormFieldValid,
- createGetFormValues,
- createGetFormInitialValues,
- createGetFormFieldValue,
- createGetFormFieldInitialValue,
- createGetFormSafetyValues,
- createGetFormFieldSafetyValue,
- createGetFormStatuses,
- createGetIsFormPristine,
- createGetFormFieldStatus,
- createGetIsFormFieldPristine,

# v0.x
## v0.9.0
add to export internal action creators
## v0.8.0
add props __clearError__, __clearFormErrors__
## v0.7.7
fix condition in __validateAll__ method
## v0.7.6
fix __validateAll__ method
## v0.7.5
fix __validateAll__ method
## v0.7.4
fix all defects
## v0.7.0
__errorMessage__ in config is depricated. Validator callback should return error message or null
## v6.0.1
fix array of errors
## v0.6.0
Ability to return number from validator callback, which is an index of error Array.
## v0.5.2
bugfix: removers clear initial values
## v0.5.1
bugfix: do not validate initial values on _dirty_ field
## v0.5.0
add _rules?: { exclude: Array\<string\> }_ argument to _validateAll_ prop
fix _removers_ callbacks: now do not return initialValues after executing
## v0.4.0
add _removers_ and _validators_ on each field
## v0.3.2
fixed _validateOnChange_ config flag
## v0.3.0
added _getFormsFrom_ config callback
## v0.1.1
fixed webpack.config
## v0.1.x
#### Reducer
- _receive_ one argument - __FormsList__, which is a Map of forms ids used through the application.
- _return_ forms reducer, which is bound with react-redux-easy-form decorator
#### Decorator (HOC)
- _receive_ one argument - __formConfig__, which is an object consists of three properties: _formName_, _fields_, _formValidator_.
- _decorate_ a React-component with following props: _form_, _getters_, _setters_, _dropForm_, _validateAll_.
