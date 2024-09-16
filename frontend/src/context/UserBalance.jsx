import { createContext, useState, useContext } from "react";

const CurrentBalance = createContext();

export function BalanceProvider({children}) {
    const [balance, setBalance] = useState(0)

    const contextValue = {
        balance,
        setBalance
    }

    return (
        <CurrentBalance.Provider value = {contextValue}>
            {children}
        </CurrentBalance.Provider>
    )
}

export const useBalanceProvider = () => useContext(CurrentBalance)
