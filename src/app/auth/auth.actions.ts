import {Action} from '@ngrx/store';

export const SET_AUTHENTICATED='[AUTH] SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED='[AUTH] SET_UNAUTHENTICATED';

export class SetAuthenticated implements Action{
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action{
  readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;
