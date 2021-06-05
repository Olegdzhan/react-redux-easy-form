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
     (value: string): string | null => Number(value) > 99 ? 'Must be less than 100' : null,
  ],
};
```

#### IFieldConfig
##### changeValueGetter -
A callback, that calls in onChange callback-prop, and transforms input argument into output result to set.
##### validateOnChange -
A boolean flag, which decides to call fieldValidator on each onChange call to immediately receive validation result.
##### validators -
An array of TValidator functions, that validates the field separately. Each validation result will be set as separate element of output array.

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
##### clear -
A callback, clearing the field value in redux-store.
##### errors -
An array of field errors, provided after the validators called.
##### isFieldValid -
A boolean value defines that field validation completed with no errors.
##### isPristine -
A boolean value shows that field has had no changes.
##### onChange -
A callback, changing value of an input in redux store.
##### validate -
A callback, triggering the validation process of the field. For example, you can put it in onFocus, or onBlur props of your input.
##### value -
Current value of the field in forms state of redux store.

## Action-Creators
### Action-Creators starting the middleware
#### changeValue
`changeValue(formName: string, fieldName: string, value: any): void`
Starts a middleware changing form field value. Field status becomes __dirty__.
#### changeValueAndValidate
`changeValueAndValidate(formName: string, fieldName: string, value: any): void`
Starts a middleware changing form field value and immediately calls the validator on it.
#### clearValue
`clearValue(formName: string, fieldName: string): void`
Starts a middleware clearing the field value. Status becomes __dirty__.
#### validateAll
`validateAll(formName: string): void`
Starts a middleware launching all validators in the form.
#### validateField
`validateField(formName: string, fieldName: string): void`
Starts a middleware launching all validators for the field.
