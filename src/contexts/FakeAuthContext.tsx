import { createContext, useContext, useReducer, ReactNode } from 'react';

import { User } from '../types/user';

interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

type State = {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

type Action = 
  | { type: 'login', payload: User }
  | { type: 'logout' }

function reducer(state: State, action: Action): State {
  switch(action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default: throw new Error('Unknown action type');
  }
}

const FAKE_USER: User = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const[{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  function login(email: string, password: string): void {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER });
    }
  }

  function logout(): void {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider 
      value={{ user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error('AuthContext was used outside of AuthProvider');

  return context;
}