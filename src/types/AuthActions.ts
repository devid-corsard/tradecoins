type SetUser = { type: 'SET_USER', payload: string };
type Logout = { type: 'LOGOUT' };
export type AuthActions = SetUser | Logout;
