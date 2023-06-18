import { ReactNode, createContext, useReducer } from 'react';
import { AuthContextType } from '../types/AuthContextType';
import User from '../types/User';
import { AuthActions } from '../types/AuthActions';
import { INITIAL_USER } from './inits';

export const AuthContext = createContext<AuthContextType>({
  user: INITIAL_USER,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => { },
});

type Props = { children: ReactNode };

export const AuthContextProvider = ({ children }: Props) => {
  const userReducer = (state: User, action: AuthActions): User => {
    switch (action.type) {
      case 'LOGOUT':
        return INITIAL_USER;
      case 'SET_USER':
        return { name: action.payload || '', id: 'testId' };
      default:
        return state;
    }
  };

  const [user, dispatch] = useReducer(userReducer, INITIAL_USER);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
