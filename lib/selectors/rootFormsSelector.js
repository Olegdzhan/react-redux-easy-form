// @flow

import type { TStateWithForms } from '../types/private/TStateWithForm';
import type { TFormsBranchState } from '../types/TFormsBranchState';

const defaultForms: TFormsBranchState = {};

export default (state: TStateWithForms): TFormsBranchState => state.forms || defaultForms;
