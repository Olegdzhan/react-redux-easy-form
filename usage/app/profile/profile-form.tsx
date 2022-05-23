import React, {
  BaseSyntheticEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, validateAll } from '@/src';
import { EFormName } from '../app-enums';
import { TAppState } from '../app-types';
import { EProfileFieldName } from './profile-enums';
import { AgeField, FullNameField, GenderField } from './profile-fields';
import { profileFormValidator } from './profile-form-validator';

export const ProfileForm = memo(() => {
  const dispatch = useDispatch();

  const fullName = useSelector((state: TAppState): string => state.response.fullName ?? '');

  const initialValues = useMemo(() => ({
    [EProfileFieldName.FullName]: fullName,
  }), [fullName]);

  useEffect(() => {
    new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('Oleg Mukhov');
      }, 300);
    }).then((fullName: string): void => {
      dispatch({ type: 'SET_RESPONSE', payload: fullName });
    });
  }, []);

  const onSubmit = useCallback((event: BaseSyntheticEvent) => {
    event.preventDefault();
    dispatch(validateAll(EFormName.Profile));
  }, []);

  return (
    <Form
      initialValues={initialValues}
      name={EFormName.Profile}
      onSubmit={onSubmit}
      validate={profileFormValidator}
    >
      <AgeField />
      <FullNameField />
      <GenderField />
      <button type="submit">Validate</button>
    </Form>
  );
});
