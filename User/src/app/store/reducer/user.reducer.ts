import { User } from '../../models/user';
import { Action, createReducer, on } from '@ngrx/store';
import * as userActions from '../action/user.actions'

export const userFeatureKey = 'user';

export interface userState {
  users:User[]

}

export const initialState: userState = {
  users:[]

};


export const userReducer = createReducer(
  initialState,
  on(userActions.loadUser,(state:userState,{user})=>({...state,users:[...state.users,user]}))

);

export function reducer(state: userState | undefined, action: Action): any {
  
    return userReducer(state, action);
  
  }

