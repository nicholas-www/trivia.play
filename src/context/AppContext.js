import React from 'react'
import { useContext, createContext, useState } from "react";
import { Outlet } from 'react-router-dom';

const AppContext = createContext({})



export const AppContextProvider = ({children}) => {

  const [selected, setSelected] = useState("");

  return (
        <AppContext.Provider value={{
          selected, setSelected
        }}>
            {children}
        </AppContext.Provider>
  )
}

export default AppContext