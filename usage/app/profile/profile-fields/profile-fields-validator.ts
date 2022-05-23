import { TAppState } from '../../app-types';

export class ProfileFieldsValidator {
  static validateMaxAge(value: string | undefined): string | null {
    return Number(value) > 99 ? 'Must be less than 99' : null;
  }

  static validateMinAge(value: string | undefined): string | null {
    return Number(value ?? 0) < 1 ? 'Must be more than 1' : null;
  }

  static validateFullNameSpace(value: string): string | null {
    const trimmed = value.trim();
    if (!trimmed.includes(' ')) {
      return 'Full name must be separated by spacebar';
    }
    return null;
  }

  static validateFullNamePartialsLength(value: string): string | null {
    const trimmed = value.trim();
    const namePartials = trimmed.split(' ');
    const message = 'Full name partials must contain more than 2 chars';
    if (namePartials.length < 2) {
      return message;
    }
    for (const part of namePartials) {
      if (!part || part.length < 2) {
        return message;
      }
    }
    return null;
  }

  static validateFullNameIdentity(value: string, state: TAppState): string | null {
    const trimmed = value.trim();
    if (trimmed === state.response.fullName) {
      return 'Must not be equal to initial full name';
    }
    return null;
  }
}
