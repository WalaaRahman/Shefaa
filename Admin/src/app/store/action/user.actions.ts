import { User } from '../../models/user';
import { createAction, props } from '@ngrx/store';

export const loadUser = createAction(
  '[User] Load User',
  (user:User)=>({user})
);




