import {ActionReducerMap , createFeatureSelector , createSelector} from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';

export interface State {
  ui : fromUi.State;
}

export const reducers : ActionReducerMap<State> = {
  ui : fromUi.uiReducer
}

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
