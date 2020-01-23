// @flow

import type { TClearFieldErrorActionPayload } from '../../actionCreators/clearFieldError';
import type { TClearFormErrorsActionPayload } from '../../actionCreators/clearFormErrors';
import type { TDropFormActionPayload } from '../../actionCreators/dropForm';
import type { TMakeDirtyActionPayload } from '../../actionCreators/makeDirty';
import type { TMakePristineActionPayload } from '../../actionCreators/makePristine';
import type { TSetInitialValuesActionPayload } from '../../actionCreators/setInitialValues';
import type { TSetValueActionPayload } from '../../actionCreators/setValue';
import type { TValidateFieldActionPayload } from '../../actionCreators/validateField';
import type { TValidateFormActionPayload } from '../../actionCreators/validateForm';
import type {TAction} from "../TAction";

export type TAnyFormAction = TAction<
    TClearFieldErrorActionPayload
    | TClearFormErrorsActionPayload
    | TDropFormActionPayload
    | TMakeDirtyActionPayload
    | TMakePristineActionPayload
    | TSetInitialValuesActionPayload
    | TSetValueActionPayload
    | TValidateFieldActionPayload
    | TValidateFormActionPayload
>;
