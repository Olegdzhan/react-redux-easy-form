import React, { memo } from 'react';
import { Form } from '@/src';
import { EFormName } from '../app-enums';
import { AgeField } from './profile-fields';

export const ProfileForm = memo(() => {
  return (
    <Form
      name={EFormName.Profile}
    >
      <AgeField />
    </Form>
  );
});
