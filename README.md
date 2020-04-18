# react-redux-easy-form@1.0.0
`react-redux-easy-form` helps you connect your forms with redux easier

## Table of Contents
### [Installation](#installation)
### [Forms Reducer](#reducer)
### [Using the HOC](#hoc)
### [Easy Form Configuration](#configuration)
### [Provided Props](#props)
### [Action Creators](#actions)
### [Selectors](#selectors)
### [Field Statuses](#statuses)
### [Using With React-Redux @connect](#connect)
### [Migrating From v0.x](#migrating)

## <a name="installation">Installation</a>
```node
npm i react-redux-easy-form --save
```

## <a name="reducer">Creating Forms Reducer</a>
1. Define your __FormsMap__ - a map, which contains the names of your forms. It allows to bind your form with redux store.
    ```javascript
    const FormsMap = {
        UserForm: 'userForm',
        ProductForm: 'productForm'
    };
    ```
2. Add __formsReducer__ to your __rootReducer__
    ```javascript
    import { combineReducers } from 'redux';
    import { getFormsReducer } from 'react-redux-easy-form';
    // also import your FormsMap if it was defined in separate file

    const forms = getFormsReducer(FormsMap);
    export default combineReducers({
        // your reducers
        forms,
    });
    ```
    By default the decorator will be looking for the forms reference in `state => state.forms`

## Use the @easyForm HOC
1. Import __easyForm__ decorator (HOC)
    ```javascript
    import {
      easyForm,
      type TEasyFormHocProps,
      type TEasyFormConfig,
      type TEasyFormHocValuesField,
      type TEasyFormHocFormErrors,
    } from 'react-redux-easy-form';
    ```
2. Create a React-component with form you want to configure
    ```javascript
    type TProps = TEasyFormHocProps & {
      title: string;
    }
    export default class UserForm extends PureComponent<TProps> {
        onSubmit = event => {
            event.preventDefault();
        };

        render() {
            return (
                <div>
                    <h1>{this.props.title}</h1>
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
    const config: TEasyFormConfig = {
        formName: FormsMap.UserForm,
        fields: {
            firstName: {
                emptyValue: '',
                initialValue: 'Name',
                type: 'string',
                validateOnChange: true,
                errorMessage: 'First name is required',
                validator: val => val && val.trim(),
            },
            secondName: {
                emptyValue: '',
                initialValue: props => props.lastName,
                type: 'string',
                validateOnChange: true,
                errorMessage: 'Second name must be longer than 4 letters',
                validator: val => val && val.trim() && val.length > 4,
            },
        },
        formValidator: ({ firstName, lastName }: TEasyFormHocValuesField): TEasyFormHocFormErrors => {
            if (firstName && lastName && firstName === lastName) {
                return ['First name and Last name must not be equal.'];
            }
        },
    };
    ```
4. Decorate the component with `easyForm` and the config
    ```javascript
    @easyForm(config)
    export default class UserForm extends PureComponent<TProps> { /*...*/ }
    ```
5. Now FormsMap.UserForm has access to `values` and `setters` props, either to all props in type TEasyFormHocProps.
    ```javascript
    render() {
        const {
            form: {
                values,
                fieldErrors,
            },
            setters,
        } = this.props;

        return (
            <div>
                <h1>User Form</h1>
                <form onSubmit={this.onSubmit}>
                    <span>{fieldErrors.firstName}</span>
                    <input
                        type="text"
                        value={values.firstName}
                        onChange={setters.firstName}
                    />
                    <span>{fieldErrors.secondName}</span>
                    <input
                        type="text"
                        value={values.secondName}
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
            form: { values },
            validateAll,
            dropForm
        } = this.props;
        if (validateAll()) {
            // do something with values
            dropForm();
        }
    };
    ```
   
## <a name="configuration">Easy Form Configuration</a>
If you use flow-types you can import next to your application:
- **TEasyFormConfig** - type of the whole configuration object
- **TEasyFormFieldConfig** - type of each field in your config
### TEasyFormConfig fields:
1. **formName (required)** - the name of the form, which must be initiated in your FormsMap.
2. **fields (required)** - a configuration for each field on the form `{ [fieldKey: string]: TEasyFormFieldConfig }`. The fieldKey you set in the config will be correspond with the same key in *props.form.values[key]*.
3. **formValidator (optional)** - the function validator for set values.
### TEasyFormFieldConfig fields:
1. **emptyValue (required)** - the value, which will be set after you clear a field value (call dropForm, of clearFieldValue).
2. **initialValue (required)** - the value, which set into the field on the form mounts. Can also be a callback with `props` argument.
3. **onChange (optional)** - the callback to parse an output value from an input value. By default: `event => event.target.value`.
4. **validateOnChange (optional)** - the boolean allows call the field validator function on each change if `true`. By default: `false`.
5. **validator (optional)** - the field validator function, get the value and return an error message or null.

## <a name="props">Props injected into a component by @easyForm</a>
If you use flow-types, you can import type TEasyFormHocProps, which contains all props are provided
@easyForm provides 3 groups of props:
### Props you can reach from `props.form`
1. `props.form.values` - a map of values, where a key is the fieldKey from the configuration object. EasyForm knows which value it needs to set: initial or current.
2. `props.form.initialValues` - a map of initial values.
3. `props.form.fieldErrors` - a map of errors corresponding to the fields. 
4. `props.form.formErrors` - the array of errors returned by `formValidator`.
5. `props.form.statuses` - a map of statuses corresponding to the fields (*pristine* or *dirty*).
### Props you can reach from `props.formActions`
They are all action-creators provided by the library. They are **already bound** to `formName`.
### Props you can reach from `props`
1. `props.setters` - a map of callbacks, you can put into a form-control onChange prop. Similar to `props.formActions.setValue`, but calls as `setters[fieldName](value)` instead of `setValue(fieldName, value)`.
2. `props.validators` - a map of validators callbacks. Similar to `props.formActions.validateField`, but calls as `validators[fieldName]()` instead of `validateField(fieldName, message)`.
3. `props.removers` - a map of functions to clear corresponding fields values.
4. `props.validateAll` - a function, which calls all validators in the form. If you need not to validate some fields, you can set an optional argument: `validateAll({ exclude: ['firstName', 'lastName'] })`.
5. `props.clearError` - a map of functions to clear corresponding to the fields errors. Similar to `props.formActions.clearFieldError`, but calls as `clearError[fieldName]()` instead of `clearFieldError(fieldName)`. 

## <a name="actions">Action Creators</a>
You can use the following action creators to influence on easy-form manually right from your application middleware:
- `setValue(formName: string, fieldKey: string, value: any)` - set the value of the control of the form
- `setInitialValues(formName: string, initialValues: Array<{ [fieldKey: string]: any}>)` set the initialValues as a map of the form values
- `setEmptyValues(formName: string, fieldsConfig: { [fieldKey: string]: TEasyFormFieldConfig })` set the emptyValues
- `validateField(formName: string, fieldKey: string, errorMessage: string)` set an error to the field of the form
- `clearFieldError(formName: string, fieldKey: string)` - remove all errors from the field of the form
- `clearFormErrors(formName: string)` - remove all errors from the form
- `validateForm(formName: string, errorsArray: string[])` - set crossfields errors to the form
- `dropForm(formName: string, saveInitial: boolean)` - drop of the values from all the fields of the form, if saveInitial set to true, keep the initial values
- `makeDirty(formName: string, fieldKey: string)` - set the field of the form to status dirty
- `makePristine(formName: string, fieldKey: string)` - set the field of the form to status pristine

## <a name="selectors">Selectors</a>
- `rootFormsSelector => TFormsBranchState` - return forms branch from store
- `selectForm(formName: string) => TFormState` - return a specific form
- `selectFormErrors(formName: string) => TEasyFormHocFormErrors` - return formErrors array for a specific form (may return undefined)
- `selectFormFieldErrors(formName: string) => TEasyFormHocErrorsField` - return the map { fieldName: error } for a specific form
- `selectFormInitialValues(formName: string) => TEasyFormHocValuesField` - return the map { fieldName: initialValue } for a specific form
- `selectFormCurrentValues(formName: string) => TEasyFormHocValuesField` - return the map { fieldName: currentValue } for a specific form
- `selectFormStatuses(formName: string) => TEasyFormHocStatusesField` - return the map { fieldName: status } for a specific form
- `selectFormValues(formName: string) => TEasyFormHocValuesField` - return the map { fieldName: values } for a specific form. The value might be initial or current depending on status
- `selectFormStructuredProps(formName: string) => TFormStructuredProps` - return all data for a specific form equals to `props.form` in form component. 

## <a name="statuses">Field Statuses</a>
There are two statuses:
`import { FieldStatus, type TFieldStatus } from 'react-redux-easy-form';`
- `FieldStatus.Pristine`
- `FieldStatus.Dirty`

## <a name="connect">Using With React-Redux @connect and custom hocs</a>
if a component got props you need as initial values from react-redux __connect__, you must place it __before__ `easyForm` HOC.
```javascript
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

## <a name="migrating">Migrating From v0.x</a>
1. Replace all `props.getters` with `props.form.values`
2. Replace all `props.errors` with `props.form.errors`
3. Remove `type` in field configuration.
4. Add `emptyValue` for each field configuration.
5. Be sure your **fields-validators** return `string` or `null`.
6. Do not set formName argument to `dropForm`, it's automatically bound in the dispatcher.
