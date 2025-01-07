import { createContext, useState, useContext} from "react";

const NavigationContext = createContext();

export function NavContextProvider({children}) {
    const [hiddenNav, setHiddenNav] = useState(false)

    const contextValue = {
        hiddenNav,
        setHiddenNav
    }

    return (
        <NavigationContext.Provider value = {contextValue}>
            {children}
        </NavigationContext.Provider>
    )
}

export const useContextProviderFunc = () => useContext(NavigationContext)
