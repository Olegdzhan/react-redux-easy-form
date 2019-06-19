# react-redux-easy-form
`react-redux-easy-form` helps you connect your forms with redux easier and create a readable way to define onChange callbacks and validators.

## Installation
```node
npm i react-redux-easy-form --save
```
It also need `react`, `redux`, `react-redux` to be installed.

You can add `babel-plugin-transform-decorators-legacy` to your `.babelrc`, to decorate React-components with decorator notation.

In your `.babelrc` add:
```javascript
{
    "presets": ["react", "env"],
    "plugins": ["transform-decorators-legacy"]
}
```

## Configuring redux-store
1. Define your __FormsMap__
    ```javascript
    const FormsMap = {
        USER_FORM: 'userForm',
        PRODUCT_FORM: 'productForm'
    };
    ```
2. Add __formsReducer__ to your __rootReducer__
    ```javascript
    import { combineReducer } from 'redux';
    import { getFormsReducer } from 'react-redux-easy-form';
    // also import your FormsMap if it was defined in separate file

    const forms = getFormsReducer(FormsMap);
    export default combineReducers({
        // your reducers
        forms
    });
    ```
    By default the decorator will be looking for forms reference in `state => state.forms`

## Use the decorator
1. Import __easyForm__ decorator (HOC)
    ```javascript
    import { easyForm } from 'react-redux-easy-form';
    ```
2. Create a React-component with form you want to configure
    ```javascript
    export default class UserForm extends PureComponent {
        onSubmit = event => {
            event.preventDefault();
        };

        render() {
            return (
                <div>
                    <h1>User Form</h1>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" />
                        <input type="text" />
                        <button type="submit">Submit!</button>
                    </form>
                </div>
            );
        }
    }
    ```
3. Create a config object for `easyForm`
    ```javascript
    const config = {
        formName: FormsMap.USER_FORM,
        fields: {
            firstName: {
                initialValue: 'Oleg',
                type: 'string',
                validateOnChange: true,
                errorMessage: 'First name is required',
                validator: val => val && val.trim()
            },
            secondName: {
                initialValue: props => props.lastName,
                type: 'string',
                validateOnChange: true,
                errorMessage: 'Second name must be longer than 4 letters',
                validator: val => val && val.trim() && val.length > 4
            }
        },
        formValidator: ({ firstName, lastName }) => {
            if (firstName && lastName && firstName === lastName) {
                return ['First name and Last name must not be equal.'];
            }
            return [];
        }
    };
    ```
4. Decorate the component with `easyForm` and the config
    ```javascript
    @easyForm(config)
    export default class UserForm extends PureComponent { /*...*/ }
    ```
5. Now UserForm has access to `getters` and `setters` props, either to `dropForm`, `validateAll` callback-props and the entire form (_FormsMap.USER_FORM_) state, as `form` prop. Lets use it in render method then.
    ```javascript
    render() {
        const {
            form: {
                fieldErrors
            },
            getters,
            setters
        } = this.props;

        return (
            <div>
                <h1>User Form</h1>
                <form onSubmit={this.onSubmit}>
                    <span>{fieldErrors.firstName}</span>
                    <input
                        type="text"
                        value={getters.firstName()}
                        onChange={setters.firstName}
                    />
                    <span>{fieldErrors.secondName}</span>
                    <input
                        type="text"
                        value={getters.secondName()}
                        onChange={setters.secondName}
                    />
                    <button type="submit">Submit!</button>
                </form>
            </div>
        );
    }
    ```
6. Define onSubmit value
    ```javascript
    onSubmit = event => {
        event.preventDefault();
        const {
            form,
            validateAll,
            dropForm
        } = this.props;
        if (validateAll()) {
            console.log(form);
            dropForm(FormsMap.USER_FORM);
        }
    };
    ```
## Form state
In redux storage each form consists of following fields:
1. `initialValues` - an object with values for each field (values from config).
2. `currentValues` - an object with values for each field after any changes.
3. `fieldErrors` - an object with error messages for each field.
4. `formErrors` - an array of common errors in the form.
In redux storage it looks like:
```javascript
[formName]: {
    initialValues: {
        firstName: '',
        lastName: ''
    },
    currentValues: {
        firstName: 'John',
        lastName: 'Doe'
    },
    fieldErrors: {
        firstName: null,
        lastName: null
    },
    formErrors: []
}
```

## ConfigObject
### formName
`formName` is form id via you can drop an aproppriate form. After set FormsMap to _getFormsReducer_ it will create a default form state for each of FormsMap element.
### getFormsFrom
Can be defined as function which return a reference to a field in your redux store containing forms, or can be undefined (forms will be got from `state => state.forms`)
```javascript
// store config
const myForm = getFormsReducer(FormsMap);
combineReducers({
  myForm
});

// in a form component
const config = {
    formName: FormsMap.USER_FORM,
    getFormsFrom: state => state.myForm
    // ...
};
``` 
### fields
Each field must have a unique `key`, which will bind with the same key in redux form state. In the example above they were _firstName_ and _lastName_.
Every field object has to or may have the following propperties:
1. `initialValue` (_required_) - a value or a callback which receive component props and returns a value
    ```javascript
    firstName: {
        initialValue: props => props.firstName
    },
    lastName: {
        initialValue: 'Doe'
    }
    ```
    __warning__: if a component got props you need as initial values from react-redux __connect__, you must place it __before__ `easyForm` HOC.
    ```javascript
    // right - connect is defined before easyForm
    @connect(({ user }) => ({ user }))
    @easyForm({
        /* ... */
        fields: {
            firstName: {
                initialValue: ({ user }) => user.firstName
            }
        }
    })
    ```
2. `onChange` - a callback is used into an aproppriate __setter__, as a function which get an __event__ argument and returns a value, that updates the previous one. By default it is `event => event.target.value`.

3. `type` (_required_) - enum `['string', 'number', 'array', 'object']`, defines an input type.
4. `validator` - a callback which returns true or false. If returns true storage will dispatch an action with an error message defined in `errorMessage` attribute.
5. `errorMessage` - a string value, that will be saved into the store whether the value is not valid.
6. `validateOnChange` - a boolean value: if true, _validateField_ action creator will be called on each onChange call.
#### formValidator
`formValidator` is a callback which gets field values object as an argument and must return an array of string errors or an empty array.
```javascript
// actually it gets 'fieldValues' argument, but we can destruct it right away
formValidator: ({ firstName, lastName }) => {
    const errors = [];
    if (!(firstName && lastName)) {
        errors.push('Each field is required.');
    }
    if (firstName === lastName) {
        errors.push('First name must not be equal to Last name');
    }
    return errors;
}
```
## Props injected into component by @easyForm
1. `form` - a state returned by __forms__ reducer with formName defined as __formName__ field in the config object. Thus, if you define `formName: 'user'`, it will return `forms['user']` from redux state.
2. `getters` - an object with includes methods with the same names as you have defined in __fields__. So if your `config.fields = { firstName = {}, lastName = {} }`, it will create getters with methods: `firstName` and `lastName`. When called they return updated (current) value or initial value.
3. `setters` - similar to __getters__, except that setters object consists of methods you have to set as __onCahnge__ input callbacks.
4. `dropForm(formName, keepInitial) => void` - a callback clears form fields. Gets two arguments:
    - `formName: string` - the name of form you want to drop;
    - `keepInitial: boolean` - if true a form will be dropped and set initial values, if false - with empty default values for appropriate input type.
5. `validateAll(rules?: Object) => boolean` - a callback, that gets no arguments, validates all fields and returns true, whether it's valid. You can define _rules.exclude_ argument with an array of fields name, which you don't want to validate via validateAll.
6. `validators` - similar to __getters__, except each function will be called for same field. Use it in _onFocus_, _onBlur_ for example.
7. `removers` -  similar to __getters__, contains callbacks to clear same field.
8. `clearError` - similar to __getters__, contains callbacks to clear error message for current field.
9. `clearFormErrors` - clear __formErrors__ array (props.form.formErrors)