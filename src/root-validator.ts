import { TFormValidator, TValidator } from './types';

export class RootValidator {
  private static instances: { [k: string]: RootValidator } = {};

  private fieldsValidators: {
    [k: string]: TValidator[];
  } = {};

  private formValidator: TFormValidator | undefined;

  constructor(formName: string) {
    if (!RootValidator.instances[formName]) {
      RootValidator.instances[formName] = this;
    }
    return RootValidator.instances[formName];
  }

  public applyFieldValidators(fieldName: string, validators: TValidator[]): void {
    this.fieldsValidators[fieldName] = validators;
  }

  public applyFormValidator(formValidator: TFormValidator): void {
    this.formValidator = formValidator;
  }

  public get validators(): [TFormValidator | undefined, { [k: string]: TValidator[] }] {
    return [this.formValidator, this.fieldsValidators];
  }
}
