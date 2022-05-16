import { createAction, props } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { User } from '../models/Users.model';

export const create_user = createAction('[User Component] create_user  User', props<User>())
export const initialState = new User();
// handle changes
export const counterReducer = createReducer(
  initialState,

  on(create_user, (state, user: User) => {
    state = user
    return state
  })
);
