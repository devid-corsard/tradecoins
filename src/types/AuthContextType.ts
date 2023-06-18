import { Dispatch } from 'react';
import User from './User';
import { AuthActions } from './AuthActions';

export type AuthContextType = {
  user: User,
  dispatch: Dispatch<AuthActions>
};
