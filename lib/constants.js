// @flow

export const FieldStatus = {
  Pristine: 'pristine',
  Dirty: 'dirty',
};

export type TFieldStatus = $Values<typeof FieldStatus>;
