import { TFormValidator, TPseudoAnyEnum, TValidator } from './types';

export class RootValidator {
  private static instances: { [FormName in TPseudoAnyEnum]: RootValidator } = {};

  private fieldsValidators: {
    [P in TPseudoAnyEnum]?: TValidator[];
  } = {};

  private formValidator: TFormValidator | undefined;

  constructor(formName: TPseudoAnyEnum) {
    if (!RootValidator.instances[formName]) {
      RootValidator.instances[formName] = new RootValidator(formName);
    }
    return RootValidator.instances[formName];
  }

  applyFieldValidators(fieldName: TPseudoAnyEnum, validators: TValidator[]): void {
    this.fieldsValidators[fieldName] = validators;
  }

  applyFormValidator(formValidator: TFormValidator): void {
    this.formValidator = formValidator;
  }

  get validators(): [TFormValidator | undefined, { [P in TPseudoAnyEnum]?: TValidator[] }] {
    return [this.formValidator, this.fieldsValidators];
  }
}
