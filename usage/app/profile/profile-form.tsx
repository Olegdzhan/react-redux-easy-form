import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Form } from '@/src';
import { EFormName } from '../app-enums';
import { TAppState } from '../app-types';
import { EProfileFieldName } from './profile-enums';
import { AgeField, FullNameField } from './profile-fields';

export const ProfileForm = memo(() => {
  const fullName = useSelector((state: TAppState): string => state.response.fullName);

  const initialValues = useMemo(() => ({
    [EProfileFieldName.FullName]: fullName,
  }), [fullName]);

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
