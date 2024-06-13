import { ReactNode, createContext, useContext } from "react";
import useAuth from "@/hooks/useAuth";
import { Iuser } from "@/interface/IUser";

interface AuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (user: Iuser) => Promise<void | any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authenticated: boolean
}

const Context = createContext<AuthContextType | undefined>(undefined)

function UserProvider({children}: {children: ReactNode}){
  const {authenticated, register} = useAuth()

  return(
    <Context.Provider value={{authenticated, register}}>{children}</Context.Provider>
  )
}
function useAuthContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a UserProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export {useAuthContext, UserProvider}