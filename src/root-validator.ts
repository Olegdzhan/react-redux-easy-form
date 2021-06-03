import { TFormValidator, TPseudoAnyEnum, TValidator } from './types';

export class RootValidator {
  private static instances: { [FormName in TPseudoAnyEnum]: RootValidator } = {};

  private fieldsValidators: {
    [P in TPseudoAnyEnum]?: TValidator[];
  } = {};

  private formValidator: TFormValidator | undefined;

  constructor(formName: TPseudoAnyEnum) {
    if (!RootValidator.instances[formName]) {
      RootValidator.instances[formName] = this;
    }
    return RootValidator.instances[formName];
  }

  public applyFieldValidators(fieldName: TPseudoAnyEnum, validators: TValidator[]): void {
    this.fieldsValidators[fieldName] = validators;
  }

  public applyFormValidator(formValidator: TFormValidator): void {
    this.formValidator = formValidator;
  }

  public get validators(): [TFormValidator | undefined, { [P in TPseudoAnyEnum]?: TValidator[] }] {
    return [this.formValidator, this.fieldsValidators];
  }
}
