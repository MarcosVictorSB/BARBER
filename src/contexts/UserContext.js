import React, { createContext, useReducer } from "react";
import { InitialState, UserReducer } from "../reducers/UseReducer";
export const UserContext = createContext(); // craiar o contexto do usuario

export default({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, InitialState);

  
  return(
    <UserContext.Provider value={{ state, dispatch }}>
      { children }
    </UserContext.Provider>
  )
}