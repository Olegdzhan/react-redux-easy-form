# react-redux-easy-form

## Main Concepts:
1. Form has to perform in redux-middleware layer, not in components.
2. Total dividing application views and business-logic.
3. Minimum subscriptions and render processes.
4. Maximum usability.
5. Including modern React concepts.
6. Static types (TypeScript).

## Installation
`npm i react-redux-easy-form --save`

You need `react`, `redux`, `react-redux`, `reselect` also to be installed.

## Configuring redux-store

```javascript
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { easyFormMiddleware, easyFormReducer } from 'react-redux-easy-form';

const rootReducer = combineReducers({
   forms: easyFormReducer,
   // ... your reducers
});

const mws = applyMiddleware(
  easyFormMiddleware,
  // your middlewares
);

const store = createStore(rootReducer, {}, mws);
```
## Initiate Form

```javascript
import { Form } from 'react-redux-easy-form';
// if use TS, the author will recommend to use enums for forms and fields naming
import { EFormName } from '@src/root-enums';

const ProfileForm = memo(() => {
   const dispatch = useDispatch();

   const initialValues = useSelector(getProfileFormInitialValues);

   useEffect(() => {
      dispatch(fetchInitialData());
   }, []);

   return (
      <Form
        initialValues={initialValues}      
        name={EFormName.Profile}
      >
        <AgeField/>
        <FullNameField />
        <GenderField />
      </Form>
   );
});
```
The fields will be bound with form name by React Context API.

## Implement Form Fields
### Define Field Config
```javascript
import { IFieldConfig } from 'react-redux-easy-form';

const fieldConfig: IFieldConfig = {
  changeValueGetter: (event) => event.target.value,
  validateOnChange: true,
  validators: [
     (value) => Number(value) > 99 ? 'Must be less than 100' : null,
  ],
};
```

#### IFieldConfig

| Option Name | Option Type | Description |
| --- | --- | --- |
| `changeValueGetter` | `(event:any)=>any` | A callback, that calls in onChange callback-prop, and transforms input argument into output result to set |
| `validateOnChange` | `boolean` | A boolean flag, which decides to call fieldValidator on each onChange call to immediately receive validation result |
| `validators` | `TValidator[]` | An array of TValidator functions, that validates the field separately. Each validation result will be set as separate element of output array |

### Call useField Hook Within Your Component
```javascript
import { useField } from 'react-redux-easy-form';

const AgeField = memo(() => {
  const {
    errors,
    onChange,
    value,
  } = useField<string>(EProfileFieldName.Age, fieldConfig);

  return (
    <div>
      <label htmlFor={EProfileFieldName.Age}>
        Age (years)
      </label>
      <input
        name={EProfileFieldName.Age}
        onChange={onChange}
        type="number"
        value={value ?? ''}
      />
      {errors && (
        <ul>
          {errors.map((err: string) => (
            <li key={atob(err)} style={{ color: 'red' }}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
});
```
`useField` hook returns an object of type `TUseFieldSubscription`.

#### TUseFieldSubscription
| Name | Type | Description |
| --- | --- | --- |
| `clear` | `() => void` | A callback, clearing the field value in redux-store |
| `errors` | `string[]`, `null` | An array of field errors, provided after the validators called |
| `isFieldValid` | `boolean` | A boolean value defines that field validation completed with no errors |
| `isPristine` | `boolean` | A boolean value shows that field has had no changes |
| `onChange` | `(...callbackArgs: any[]) => void` | A callback, changing value of an input in redux store |
| `validate` | `() => void` | A callback, triggering the validation process of the field. For example, you can put it in onFocus, or onBlur props of your input |
| `value` | `any` | Current value of the field in forms state of redux store |

## Action-Creators
### Action-Creators starting the middleware
#### changeValue
`changeValue(formName: string, fieldName: string, value: any): Action`

Starts a middleware changing form field value. Field status becomes __dirty__.
#### changeValueAndValidate
`changeValueAndValidate(formName: string, fieldName: string, value: any): Action`

Starts a middleware changing form field value and immediately calls the validator on it.
#### clearValue
`clearValue(formName: string, fieldName: string): Action`

Starts a middleware clearing the field value. Status becomes __dirty__.
#### validateAll
`validateAll(formName: string): Action`

Starts a middleware launching all validators in the form.
#### validateField
`validateField(formName: string, fieldName: string): Action`

Starts a middleware launching all validators for the field.

### Flat Action-Creators
#### clearFieldErrors
`clearFieldErrors(formName: string, fieldName: string): Action`

Sets the field errors to null
#### clearFieldValue
`clearFieldValue(formName: string, fieldName: string): Action`

Sets the form field value to null
#### initiateForm
`initiateForm(formName: string, initialValues: object): Action`

#### setFieldErrors
`setFieldErrors(formName: string, fieldName: string, errors: string[] | null): Action`

Sets the field validation errors
#### setFieldStatus
`setFieldStatus(formName: string, fieldName: string, status: EEasyFormFieldStatus): Action`

Sets the field status
#### setFieldValue
`setFieldValue(formName: string, fieldName: string, value: any): Action`

Sets the value into the form field
#### setFormErrors
`setFormErrors(formName: string, errors: string[] | null): Action`

Sets the form errors
#### dropForm
`dropForm(formName: string): Action`

Clears all __values__, keeps all __initials__, and sets all statuses to __pristine__

## Selectors
### getForms
Returns forms state branch
#### createGetForm
`createGetForm(formName: string): Selector`

Returns the form state by the form name
#### createGetCommonFormErrors
`createGetCommonFormErrors(formName: string): Selector`

Returns the form errors (only common errors, except fields errors)
#### createGetFormAllFieldsErrors
`createGetFormAllFieldsErrors(formName: string): Selector`

Returns the form fields errors (common form errors not included)
#### createGetFormErrors
`createGetFormErrors(formName: string): Selector`

Returns all of the form validation errors
#### createGetIsFormValid
`createGetIsFormValid(formName: string): Selector`

Returns a boolean flag, whether the form is valid
#### createGetFormValues
`createGetFormValues(formName: string): Selector`

Returns values state branch of the form
#### createGetFormInitialValues
`createGetFormInitialValues(formState: string): Selector`

Returns initials state branch of the form
#### createGetFormStatuses
`createGetFormStatuses(formName: string): Selector`

Returns statuses state branch of the form
#### createGetIsFormPristine
`createGetIsFormPristine(formName: string): Selector`

Returns a boolean flag, whether all of the form fields are in pristine status
#### createGetFormFieldValue
`createGetFormFieldValue(formName: string, fieldName: string): Selector`

Returns the form field value (from values state branch)
#### createGetFormFieldInitialValue
`createGetFormFieldInitialValue(formName: string, fieldName: string): Selector`

Returns the form field initial value (from initials state branch)
#### createGetFormFieldErrors
`createGetFormFieldErrors(formName: string, fieldName: string): Selector`

Returns the form field errors (from errors state branch)
#### createGetIsFormFieldValid
`createGetIsFormFieldValid(formName: string, fieldName: string): Selector`

Returns a boolean flag of the validation result of the form field
#### createGetFormFieldStatus
`createGetFormFieldStatus(formName: string, fieldName: string): Selector`

Returns the form field status (from statuses state branch)
#### createGetIsFormFieldPristine
`createGetIsFormFieldPristine(formName: string, fieldName: string): Selector`

Returns a boolean flag, whether the form field is pristine
#### createGetFormFieldSafetyValue
`createGetFormFieldSafetyValue(formName: string, fieldName: string): Selector`

Returns a calculated current value of the form field. The Calculation includes the set value, the initial value and the field status.

#### createGetFormSafetyValues
`createGetFormSafetyValues(formName: string): Selector`

An analogue of createGetFormFieldSafetyValue selector-creator, but returns all of the values of the form 
