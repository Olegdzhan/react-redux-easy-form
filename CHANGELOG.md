# v0.x
## v0.1.x
#### Reducer
- _receive_ one argument - __FormsList__, which is a Map of forms ids used through the application.
- _return_ forms reducer, which is bound with react-redux-easy-form decorator
#### Decorator (HOC)
- _receive_ one argument - __formConfig__, which is an object consists of three properties: _formName_, _fields_, _formValidator_.
- _decorate_ a React-component with following props: _form_, _getters_, _setters_, _dropForm_, _validateAll_.
