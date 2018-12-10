# v0.x
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
