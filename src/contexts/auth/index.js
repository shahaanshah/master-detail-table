import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  isLoggedIn: false
};

if(window.localStorage.getItem("username"))
{
  initialState.isLoggedIn = true;
}

const authReducer = (state, { type }) => {
  switch (type) {
    case "TOGGLE_AUTH":
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return {
        ...state
      };
  }
};

export default function AuthProvider({ children }) {
  const [authState, dispatchAuth] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider
      value={{ authState: authState, dispatchAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}