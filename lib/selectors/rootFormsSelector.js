// @flow

import type { TFormsBranchState } from '../reducer';

export type TStateWithForms<AppState> = AppState & {
    forms: TFormsBranchState;
}

export default (state: TStateWithForms<{}>): TFormsBranchState => state.forms || {};
