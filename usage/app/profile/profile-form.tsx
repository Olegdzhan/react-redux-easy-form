import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@/src';
import { EFormName } from '../app-enums';
import { TAppState } from '../app-types';
import { EProfileFieldName } from './profile-enums';
import { AgeField, FullNameField } from './profile-fields';

export const ProfileForm = memo(() => {
  const dispatch = useDispatch();

  const fullName = useSelector((state: TAppState): string => state.response.fullName);

  const initialValues = useMemo(() => ({
    [EProfileFieldName.FullName]: fullName,
  }), [fullName]);

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('Oleg Mukhov');
      }, 5000);
    }).then((fullName: string) => dispatch({ type: 'SET_RESPONSE', payload: fullName }));
  }, [])

  return (
    <Form
      initialValues={initialValues}
      name={EFormName.Profile}
    >
      <AgeField />
      <FullNameField />
    </Form>
  );
});
